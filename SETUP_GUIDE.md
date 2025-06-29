# WriteHub MERN Stack Setup Guide

## Issues Fixed ✅

1. **CORS Configuration** - Updated to allow requests from your Vercel frontend
2. **Missing Environment Files** - Created hardcoded environment files
3. **Post Model Fields** - Added missing category and tags fields
4. **Authentication** - Fixed cookie/localStorage compatibility
5. **API Service** - Updated to handle both authentication methods

## Environment Files Setup

### Backend Environment Files

#### For Production (Render):
Copy the contents of `backend/env.production` to `backend/.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# MongoDB Configuration (Replace with your MongoDB Atlas connection string)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/megablog

# JWT Configuration (Generate a strong secret key)
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random_at_least_32_characters

# Cookie Configuration
COOKIE_EXPIRE=7

# CORS Configuration (Replace with your actual frontend URL)
FRONTEND_URL=https://write-hub-pi.vercel.app

# File Upload Configuration
MAX_FILE_SIZE=5242880
```

#### For Development (Local):
Copy the contents of `backend/env.development` to `backend/.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/megablog
MONGODB_PORT=27017

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Cookie Configuration
COOKIE_EXPIRE=7

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# File Upload Configuration
MAX_FILE_SIZE=5242880
```

### Frontend Environment Files

#### For Production (Vercel):
Copy the contents of `frontend/env.production` to `frontend/.env`:

```env
# API Configuration
VITE_API_URL=https://writehub-backend.onrender.com/api

# App Configuration
VITE_APP_NAME=WriteHub
VITE_APP_DESCRIPTION=A modern blog platform
```

#### For Development (Local):
Copy the contents of `frontend/env.development` to `frontend/.env`:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=WriteHub
VITE_APP_DESCRIPTION=A modern blog platform
```

## Deployment Instructions

### Backend (Render)

1. **Create .env file** in your backend directory with production values
2. **Update MongoDB URI** with your actual MongoDB Atlas connection string
3. **Generate JWT Secret** - Use a strong random string (at least 32 characters)
4. **Set Environment Variables** in Render dashboard:
   - `NODE_ENV=production`
   - `FRONTEND_URL=https://write-hub-pi.vercel.app`
   - `JWT_SECRET=your_actual_secret_key`
   - `MONGODB_URI=your_mongodb_atlas_connection_string`

### Frontend (Vercel)

1. **Create .env file** in your frontend directory with production values
2. **Update API URL** to match your backend URL
3. **Deploy** - Vercel will automatically use the environment variables

## Key Changes Made

### 1. CORS Configuration
- Added your Vercel domain to allowed origins
- Enhanced CORS options for better compatibility

### 2. Authentication
- Backend now supports both cookies and Authorization headers
- Frontend stores tokens in localStorage and sends them in headers
- Auth routes return tokens in response for localStorage compatibility

### 3. Post Model
- Added `category` field (default: 'General')
- Added `tags` array field
- Updated status enum to include 'draft'

### 4. API Service
- Enhanced error handling
- Added Authorization header support
- Improved token management

## Testing the Setup

1. **Backend Health Check**: Visit `https://your-backend-url/health`
2. **Frontend**: Visit your Vercel URL
3. **Test Registration/Login**: Create an account and test authentication
4. **Test Post Creation**: Create a post with image upload

## Common Issues & Solutions

### CORS Errors
- Ensure `FRONTEND_URL` is set correctly in backend environment
- Check that your Vercel domain is in the CORS origins list

### Authentication Issues
- Verify JWT_SECRET is set correctly
- Check that tokens are being stored in localStorage
- Ensure Authorization headers are being sent

### MongoDB Connection
- Verify MongoDB Atlas connection string
- Check network access settings in MongoDB Atlas
- Ensure database user has correct permissions

### Image Upload Issues
- Check file size limits (5MB max)
- Verify image format (jpg, png, gif, webp, svg)
- Ensure multer configuration is correct

## File Locations Summary

- **Backend .env**: `backend/.env`
- **Frontend .env**: `frontend/.env`
- **Backend Production Template**: `backend/env.production`
- **Backend Development Template**: `backend/env.development`
- **Frontend Production Template**: `frontend/env.production`
- **Frontend Development Template**: `frontend/env.development`

## Next Steps

1. Copy the appropriate environment files to `.env`
2. Update the values with your actual credentials
3. Deploy backend to Render
4. Deploy frontend to Vercel
5. Test all functionality

The project should now work correctly with proper authentication, CORS, and all features functioning as expected! 