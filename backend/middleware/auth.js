import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to protect routes (requires authentication)
export const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from cookies
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    
    // Get token from Authorization header
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    
    // Get user from token
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Middleware to check if user is logged in (optional authentication)
export const isLoggedIn = async (req, res, next) => {
  try {
    let token;

    // Get token from cookies
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    
    // Get token from Authorization header
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
      
      // Get user from token
      const user = await User.findById(decoded.id).select('-password');
      if (user) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    // If token is invalid, just continue without user
    console.error('isLoggedIn middleware error:', error);
    next();
  }
};

// Middleware to authorize specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `User role ${req.user.role} is not authorized to access this route` 
      });
    }

    next();
  };
}; 