const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    credentials: 'include', // Include cookies
    ...options,
  };

  try {
    console.log('Making API request to:', url);
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(`Network error: Please check if the backend server is running on ${API_BASE_URL}`);
    }
    throw error;
  }
};

// Auth API
export const authAPI = {
  // Register user
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  },

  // Login user
  login: async (credentials) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
  },

  // Logout user
  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },

  // Get current user
  getCurrentUser: async () => {
    return apiRequest('/auth/me');
  },

  // Update profile
  updateProfile: async (profileData) => {
    return apiRequest('/auth/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });
  },
};

// Posts API
export const postsAPI = {
  // Get all posts
  getAllPosts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/posts?${queryString}`);
  },

  // Get single post
  getPost: async (id) => {
    return apiRequest(`/posts/${id}`);
  },

  // Create post
  createPost: async (postData) => {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      credentials: 'include',
      body: postData, // postData is already FormData
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  },

  // Update post
  updatePost: async (postId, postData) => {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: 'PUT',
      credentials: 'include',
      body: postData, // postData is already FormData
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  },

  // Delete post
  deletePost: async (postId) => {
    return apiRequest(`/posts/${postId}`, {
      method: 'DELETE',
    });
  },
};

// Users API
export const usersAPI = {
  // Get user by ID
  getUser: async (userId) => {
    return apiRequest(`/users/${userId}`);
  },

  // Get user posts
  getUserPosts: async (userId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/users/${userId}/posts?${queryString}`);
  },
};

// File upload helper
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Upload failed');
  }

  return data.featuredImage;
};

// Get image URL for memory storage
export const getImageUrl = (imageId) => {
  return `${API_BASE_URL}/posts/image/${imageId}`;
}; 