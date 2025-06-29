import express from 'express';
import multer from 'multer';
import Post from '../models/Post.js';
import { protect } from '../middleware/auth.js';
import { saveImage, deleteImage, getImageDataUrl } from '../utils/saveImage.js';

const router = express.Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// @desc    Serve image from memory
// @route   GET /api/posts/image/:imageId
// @access  Public
router.get('/image/:imageId', (req, res) => {
  try {
    const { imageId } = req.params;
    const imageDataUrl = getImageDataUrl(imageId);
    
    if (!imageDataUrl) {
      return res.status(404).json({ message: 'Image not found' });
    }
    
    // Extract base64 data and content type
    const matches = imageDataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ message: 'Invalid image data' });
    }
    
    const contentType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');
    
    res.set('Content-Type', contentType);
    res.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    res.send(buffer);
  } catch (error) {
    console.error('Image serving error:', error);
    res.status(500).json({ message: 'Error serving image' });
  }
});

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status = 'active', category, search } = req.query;

    const query = { status };
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const posts = await Post.find(query)
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Post.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalPosts: count
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name email');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment views
    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'name email');
    
    res.json(updatedPost);
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create post
// @route   POST /api/posts
// @access  Private
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    // Simple validation
    if (!req.body.title || req.body.title.trim().length < 3) {
      return res.status(400).json({ message: 'Title must be at least 3 characters' });
    }
    if (!req.body.content || req.body.content.trim().length < 10) {
      return res.status(400).json({ message: 'Content must be at least 10 characters' });
    }
    if (req.body.status && !['active', 'inactive', 'draft'].includes(req.body.status)) {
      return res.status(400).json({ message: 'Status must be active, inactive, or draft' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Featured image is required' });
    }

    // Save image to memory
    const imageId = saveImage(req.file.buffer, req.file.originalname);

    const postData = {
      title: req.body.title,
      content: req.body.content,
      status: req.body.status || 'active',
      featuredImage: imageId,
      author: req.user._id,
      category: req.body.category || 'General',
      tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : []
    };

    const post = await Post.create(postData);
    await post.populate('author', 'name email');

    res.status(201).json(post);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    // Simple validation
    if (req.body.title && req.body.title.trim().length < 3) {
      return res.status(400).json({ message: 'Title must be at least 3 characters' });
    }
    if (req.body.content && req.body.content.trim().length < 10) {
      return res.status(400).json({ message: 'Content must be at least 10 characters' });
    }
    if (req.body.status && !['active', 'inactive', 'draft'].includes(req.body.status)) {
      return res.status(400).json({ message: 'Status must be active, inactive, or draft' });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check ownership or admin role
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    // Handle image upload if provided
    if (req.file) {
      // Delete old image from memory
      if (post.featuredImage) {
        deleteImage(post.featuredImage);
      }
      // Save new image to memory
      const imageId = saveImage(req.file.buffer, req.file.originalname);
      post.featuredImage = imageId;
    }

    // Update other fields
    if (req.body.title) post.title = req.body.title;
    if (req.body.content) post.content = req.body.content;
    if (req.body.status) post.status = req.body.status;
    if (req.body.category) post.category = req.body.category;
    if (req.body.tags) post.tags = req.body.tags.split(',').map(tag => tag.trim());

    const updatedPost = await post.save();
    await updatedPost.populate('author', 'name email');

    res.json(updatedPost);
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check ownership or admin role
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    // Delete image from memory
    if (post.featuredImage) {
      deleteImage(post.featuredImage);
    }

    await post.deleteOne();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 