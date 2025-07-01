# WriteHub Deployment Guide

This guide will help you deploy your WriteHub project with the existing 6 posts.

## Prerequisites
- GitHub account
- MongoDB Atlas account (free)
- Render account (free) or similar hosting service

## Step 1: Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for free account
   - Create a new cluster (free tier)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

## Step 2: Backend Deployment (Render)

1. **Push Backend to GitHub**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial backend commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/writehub-backend.git
   git push -u origin main
   ```

2. **Deploy on Render**
   - Go to [Render](https://render.com)
   - Sign up with GitHub
   - Click "New Web Service"
   - Connect your backend repository
   - Configure:
     - **Name**: writehub-backend
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Port**: 5000

3. **Set Environment Variables in Render**
   - Go to your service settings
   - Add environment variables:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/writehub
     JWT_SECRET=your_super_secret_jwt_key_here
     NODE_ENV=production
     PORT=5000
     ```

4. **Deploy and Get Backend URL**
   - Click "Create Web Service"
   - Wait for deployment
   - Copy the URL (e.g., `https://writehub-backend.onrender.com`)

## Step 3: Frontend Deployment (Vercel)

1. **Update Frontend Environment**
   - Create `.env` file in root directory:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com/api
     ```

2. **Push Frontend to GitHub**
   ```bash
   cd ..
   git init
   git add .
   git commit -m "Initial frontend commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/writehub-frontend.git
   git push -u origin main
   ```

3. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your frontend repository
   - Configure:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

4. **Set Environment Variables in Vercel**
   - Go to project settings
   - Add environment variable:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com/api
     ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment
   - Your blog will be live!

## Step 4: Verify Deployment

1. **Test Admin Login**
   - Go to your deployed frontend URL
   - Login with:
     - Email: `admin@writehub.com`
     - Password: `admin123`

2. **Verify Posts**
   - Check that all 6 posts are visible
   - Test creating, editing, and deleting posts
   - Verify images are loading correctly

## Step 5: Custom Domain (Optional)

1. **Add Custom Domain in Vercel**
   - Go to project settings
   - Add your domain
   - Update DNS records as instructed

2. **Update Environment Variables**
   - Update `VITE_API_URL` with your custom domain

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Make sure backend URL is correct in frontend environment
2. **Database Connection**: Verify MongoDB connection string
3. **Image Loading**: Check that backend image serving is working
4. **Authentication**: Ensure JWT_SECRET is set correctly

### Environment Variables Checklist:
- [ ] `MONGODB_URI` (backend)
- [ ] `JWT_SECRET` (backend)
- [ ] `NODE_ENV=production` (backend)
- [ ] `VITE_API_URL` (frontend)

## Your Live Blog URLs:
- **Frontend**: https://your-blog.vercel.app
- **Backend**: https://your-backend.onrender.com
- **Admin Login**: admin@writehub.com / admin123

## Maintenance:
- Monitor your Render and Vercel dashboards
- Check MongoDB Atlas for database usage
- Update dependencies regularly
- Backup your database periodically 