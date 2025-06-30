import express from 'express';
import multer from 'multer';
import Post from '../models/Post.js';
import { protect } from '../middleware/auth.js';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const posts = await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit);
    res.json({ posts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'name email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create post
// @route   POST /api/posts
// @access  Private
router.post('/', protect, upload.single('image'), (req, res) => {
  try {
    if (!req.body.title || !req.body.content) return res.status(400).json({ message: 'Missing fields' });
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { resource_type: 'image', folder: 'blog_images' },
      (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Image upload failed' });
        }
        Post.create({
          title: req.body.title,
          content: req.body.content,
          status: req.body.status || 'active',
          featuredImage: result.secure_url,
          author: req.user._id
        })
          .then(async post => {
            await post.populate('author', 'name email');
            res.status(201).json(post);
          })
          .catch(err => {
            res.status(500).json({ message: 'Server error' });
          });
      }
    );
    uploadStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });
    if (req.file) {
      cloudinary.v2.uploader.upload_stream({ resource_type: 'image', folder: 'blog_images' }, async (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Image upload failed' });
        }
        post.featuredImage = result.secure_url;
        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        post.status = req.body.status || post.status;
        post.updatedAt = Date.now();
        await post.save();
        await post.populate('author', 'name email');
        res.json(post);
      }).end(req.file.buffer);
    } else {
      post.title = req.body.title || post.title;
      post.content = req.body.content || post.content;
      post.status = req.body.status || post.status;
      post.updatedAt = Date.now();
      await post.save();
      await post.populate('author', 'name email');
      res.json(post);
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not authorized' });
    await post.deleteOne();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 