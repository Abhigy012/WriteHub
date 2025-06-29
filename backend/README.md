# MegaBlog Backend

Node.js/Express backend API for the MegaBlog application with MongoDB database.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp config.env.example .env
   # Edit .env with your configuration
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Create admin user**
   ```bash
   npm run fix-admin
   ```

5. **Test the API**
   - Health check: `http://localhost:5000/health`
   - API test: `http://localhost:5000/api/test`

## 🛠️ Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run migrate` - Run database migration
- `npm run fix-admin` - Create/fix admin user
- `npm run build` - Build for production (no-op for Node.js)

## 🌐 Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/megablog

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# File Upload Configuration
MAX_FILE_SIZE=5242880
```

## 🚀 Deployment to Render

### Option 1: Deploy from GitHub

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial backend commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/megablog-backend.git
   git push -u origin main
   ```

2. **Deploy on Render**
   - Go to [Render](https://render.com)
   - Sign up with GitHub
   - Click "New Web Service"
   - Connect your `megablog-backend` repository
   - Configure:
     - **Name**: `megablog-backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Port**: `5000`

3. **Set Environment Variables in Render**
   - Go to your service settings
   - Add environment variables:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/megablog
     JWT_SECRET=your_super_secret_jwt_key_here
     NODE_ENV=production
     PORT=5000
     FRONTEND_URL=https://your-frontend-domain.vercel.app
     ```

4. **Deploy and Get Backend URL**
   - Click "Create Web Service"
   - Wait for deployment
   - Copy the URL (e.g., `https://megablog-backend.onrender.com`)

### Option 2: Deploy with Render CLI

1. **Install Render CLI**
   ```bash
   npm install -g @render/cli
   ```

2. **Login to Render**
   ```bash
   render login
   ```

3. **Deploy**
   ```bash
   render deploy
   ```

## 📁 Project Structure

```
backend/
├── models/              # MongoDB schemas
│   ├── User.js         # User model
│   └── Post.js         # Post model
├── routes/              # API routes
│   ├── auth.js         # Authentication routes
│   └── posts.js        # Post routes
├── middleware/          # Custom middleware
│   └── auth.js         # Authentication middleware
├── utils/               # Utility functions
│   ├── generateToken.js # JWT token generation
│   └── saveImage.js     # Image handling
├── uploads/             # Uploaded images
├── server.js            # Main server file
├── package.json         # Dependencies and scripts
└── Procfile             # Heroku deployment configuration
```

## 🎨 Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **multer** - File upload handling
- **cors** - Cross-origin resource sharing

## 🔧 Configuration Files

### Server Configuration (`server.js`)
- Express app setup
- Middleware configuration
- Route registration
- Database connection
- Error handling

### Package Configuration (`package.json`)
- Dependencies and dev dependencies
- Scripts for development and deployment
- Node.js engine requirements

### Environment Configuration (`config.env.example`)
- Template for environment variables
- Production and development settings
- Security configurations

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Posts
- `GET /api/posts` - Get all posts (with pagination, search, filtering)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (with image upload)
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `GET /api/posts/image/:imageId` - Serve uploaded images

### Health Check
- `GET /health` - Backend health status
- `GET /api/test` - Simple API test

## 🛡️ Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation
- Secure cookie settings
- File upload restrictions

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection**
   - Verify MongoDB connection string
   - Check if MongoDB is running
   - Ensure database user has correct permissions

2. **CORS Errors**
   - Check `FRONTEND_URL` in environment
   - Verify frontend URL is correct
   - Test CORS configuration

3. **Authentication Issues**
   - Ensure `JWT_SECRET` is set correctly
   - Check cookie settings
   - Verify token generation

4. **File Upload Issues**
   - Check file size limits
   - Verify multer configuration
   - Test image serving routes

### Debug Commands

```bash
# Check server health
curl http://localhost:5000/health

# Test API endpoints
curl http://localhost:5000/api/test

# Check logs
npm run dev

# Test database connection
node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => console.log('Connected')).catch(console.error)"
```

## 🗄️ Database Setup

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Create database: `megablog`
4. Update `MONGODB_URI` in `.env`

### MongoDB Atlas (Recommended for Production)
1. Create MongoDB Atlas account
2. Create cluster (free tier available)
3. Configure database access
4. Configure network access
5. Get connection string
6. Update `MONGODB_URI` in environment variables

## 🎯 Next Steps

After deploying the backend:

1. **Test all API endpoints** using Postman or curl
2. **Create admin user** using migration script
3. **Update frontend** with backend URL
4. **Configure monitoring** and logging
5. **Set up backups** for database

## 📄 License

This project is part of the MegaBlog application and is licensed under the MIT License. 