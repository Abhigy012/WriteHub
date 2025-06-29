# MegaBlog - MERN Stack Blog

A beginner-friendly blog application built with the MERN stack (MongoDB, Express.js, React, Node.js) with separate frontend and backend deployments.

## 🚀 Features

- User registration and login
- Create, read, update, and delete blog posts
- Image upload for blog posts
- Rich text editor for post content
- Responsive design with Tailwind CSS
- JWT authentication with secure cookies
- Memory-based image storage
- Admin user management
- Separate frontend and backend deployments

## 📁 Project Structure

```
megablog/
├── frontend/           # React frontend (deploy to Vercel)
│   ├── src/           # Source code
│   ├── public/        # Static assets
│   ├── package.json   # Frontend dependencies
│   └── vercel.json    # Vercel deployment config
├── backend/           # Node.js backend (deploy to Render)
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   ├── utils/         # Utility functions
│   ├── package.json   # Backend dependencies
│   └── Procfile       # Render deployment config
├── deploy.sh          # Deployment automation script
├── DEPLOYMENT.md      # Comprehensive deployment guide
└── README.md          # This file
```

## 🛠️ Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd megablog
   ```

2. **Setup backend**
   ```bash
   cd backend
   npm install
   cp config.env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

3. **Setup frontend (in another terminal)**
   ```bash
   cd frontend
   npm install
   cp env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

4. **Create admin user**
   ```bash
   cd backend
   npm run fix-admin
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000
   - Admin Login: admin@megablog.com / admin123

## 🚀 Deployment (Render + Vercel)

### Step 1: Deploy Backend to Render

1. **Push backend to GitHub**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial backend commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/megablog-backend.git
   git push -u origin main
   ```

2. **Deploy on Render**
   - Go to [Render](https://render.com)
   - Create new Web Service
   - Connect your `megablog-backend` repository
   - Set environment variables (see backend/README.md)
   - Deploy and get your backend URL

### Step 2: Deploy Frontend to Vercel

1. **Push frontend to GitHub**
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial frontend commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/megablog-frontend.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com)
   - Create new project
   - Connect your `megablog-frontend` repository
   - Set environment variables (see frontend/README.md)
   - Deploy and get your frontend URL

### Step 3: Connect Frontend and Backend

1. **Update backend CORS settings** with your frontend URL
2. **Update frontend environment** with your backend URL
3. **Test the complete application**

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

## 🎨 Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **multer** - File upload handling
- **cors** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **html-react-parser** - HTML parsing

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/megablog
JWT_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=MegaBlog
```

## 📝 Available Scripts

### Backend Scripts
```bash
cd backend
npm run dev          # Start development server
npm start           # Start production server
npm run migrate     # Run database migration
npm run fix-admin   # Create/fix admin user
```

### Frontend Scripts
```bash
cd frontend
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

### Deployment Scripts
```bash
./deploy.sh setup   # Setup dependencies
./deploy.sh build   # Build frontend
./deploy.sh test    # Test backend
./deploy.sh deploy  # Full deployment setup
```

## 🗂️ Separate Repositories Setup

For better deployment management, you can create separate repositories:

### Backend Repository
```
megablog-backend/
├── models/
├── routes/
├── middleware/
├── utils/
├── server.js
├── package.json
└── README.md
```

### Frontend Repository
```
megablog-frontend/
├── src/
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check `FRONTEND_URL` in backend environment
   - Verify frontend URL is correct in CORS configuration

2. **Database Connection**
   - Verify MongoDB connection string
   - Check if MongoDB is running
   - Ensure database user has correct permissions

3. **Image Loading Issues**
   - Check backend image serving routes
   - Verify file upload configuration

4. **Authentication Issues**
   - Ensure `JWT_SECRET` is set correctly
   - Check cookie settings

### Debug Commands
```bash
# Check backend health
curl http://localhost:5000/health

# Test API endpoints
curl http://localhost:5000/api/test

# Check logs
cd backend && npm run dev  # Backend logs
cd frontend && npm run dev # Frontend logs
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment issues
- Review the troubleshooting section above
- Check individual README files in `frontend/` and `backend/` folders
- Create an issue for bugs or feature requests

## 🎉 Getting Started

Ready to start? Follow these steps:

1. **Local Development**: Use the Quick Start guide above
2. **Deployment**: Follow the deployment steps or see [DEPLOYMENT.md](./DEPLOYMENT.md)
3. **Customization**: Modify components in `frontend/src/components/`
4. **Styling**: Update Tailwind classes or add custom CSS

Happy blogging! 🚀
