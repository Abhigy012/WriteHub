import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create images directory if it doesn't exist
const ensureImagesDir = () => {
  const imagesDir = path.join(__dirname, '..', 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  return imagesDir;
};

// Memory storage for images using base64 encoding
const imageStore = new Map();

// Permanent images for sample posts (base64 encoded)
const permanentImages = {
  'react': {
    data: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNjFkYWY0Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UmVhY3Q8L3RleHQ+Cjwvc3ZnPgo=',
    mimeType: 'image/svg+xml',
    originalName: 'react.svg',
    createdAt: new Date('2024-01-01')
  },
  'photography': {
    data: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZmY2YjM1Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q2FtZXJhPC90ZXh0Pgo8L3N2Zz4K',
    mimeType: 'image/svg+xml',
    originalName: 'photography.svg',
    createdAt: new Date('2024-01-01')
  },
  'health': {
    data: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMjhjNzQ0Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SGVhbHRoPC90ZXh0Pgo8L3N2Zz4K',
    mimeType: 'image/svg+xml',
    originalName: 'health.svg',
    createdAt: new Date('2024-01-01')
  },
  'travel': {
    data: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZmZjMTA3Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VHJhdmVsPC90ZXh0Pgo8L3N2Zz4K',
    mimeType: 'image/svg+xml',
    originalName: 'travel.svg',
    createdAt: new Date('2024-01-01')
  },
  'cooking': {
    data: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZGMzNTQ1Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q29va2luZzwvdGV4dD4KPC9zdmc+Cg==',
    mimeType: 'image/svg+xml',
    originalName: 'cooking.svg',
    createdAt: new Date('2024-01-01')
  },
  'technology': {
    data: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNmY3NTdkIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VGVjaDwvdGV4dD4KPC9zdmc+Cg==',
    mimeType: 'image/svg+xml',
    originalName: 'technology.svg',
    createdAt: new Date('2024-01-01')
  }
};

// Initialize permanent images in memory
Object.keys(permanentImages).forEach(key => {
  imageStore.set(key, permanentImages[key]);
});

export const saveImage = (buffer, filename) => {
  try {
    // Generate unique ID
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const imageId = `${timestamp}-${randomString}`;
    
    // Convert buffer to base64
    const base64Image = buffer.toString('base64');
    const mimeType = getMimeType(filename);
    
    // Store in memory with metadata
    imageStore.set(imageId, {
      data: base64Image,
      mimeType: mimeType,
      originalName: filename,
      createdAt: new Date()
    });
    
    return imageId;
  } catch (error) {
    console.error('Error saving image:', error);
    throw new Error('Failed to save image');
  }
};

export const deleteImage = (imageId) => {
  try {
    // Don't delete permanent images
    if (permanentImages[imageId]) {
      return false;
    }
    return imageStore.delete(imageId);
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

export const getImage = (imageId) => {
  return imageStore.get(imageId);
};

export const getImageDataUrl = (imageId) => {
  const image = imageStore.get(imageId);
  if (!image) {
    return null;
  }
  return `data:${image.mimeType};base64,${image.data}`;
};

// Get permanent image by name
export const getPermanentImage = (name) => {
  return permanentImages[name] || null;
};

// Get permanent image ID by name
export const getPermanentImageId = (name) => {
  return permanentImages[name] ? name : null;
};

// Helper function to determine MIME type
const getMimeType = (filename) => {
  const ext = filename.toLowerCase().split('.').pop();
  const mimeTypes = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml'
  };
  return mimeTypes[ext] || 'image/jpeg';
};

// Cleanup old images (optional - can be called periodically)
export const cleanupOldImages = (maxAge = 24 * 60 * 60 * 1000) => { // 24 hours
  const now = new Date();
  for (const [imageId, image] of imageStore.entries()) {
    // Don't delete permanent images
    if (!permanentImages[imageId] && now - image.createdAt > maxAge) {
      imageStore.delete(imageId);
    }
  }
}; 