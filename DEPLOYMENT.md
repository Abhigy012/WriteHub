# MegaBlog Deployment Guide

This guide covers deploying your MegaBlog MERN stack application to various platforms.

## 🚀 Quick Deploy Options

### Option 1: Render (Backend) + Vercel (Frontend) - Recommended
### Option 2: Heroku (Backend) + Netlify (Frontend)
### Option 3: Railway (Full Stack)

---

## 📋 Prerequisites

- GitHub account
- MongoDB Atlas account (free)
- Render/Vercel/Heroku account (free tiers available)

---

## 🗄️ Step 1: Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for free account
   - Create a new cluster (free tier)

2. **Configure Database**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Add your IP address to the whitelist (or use 0.0.0.0/0 for all IPs)

3. **Test Connection**
   ```bash
   # Your connection string should look like:
   mongodb+srv://username:password@cluster.mongodb.net/megablog
   ```

---

## 🔧 Step 2: Backend Deployment

### Option A: Render (Recommended)

1. **Push Backend to GitHub**
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
   - Sign up with GitHub
   - Click "New Web Service"
   - Connect your backend repository
   - Configure:
     - **Name**: `megablog-backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Port**: `5000`

3. **Set Environment Variables in Render**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/megablog
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

4. **Deploy and Get Backend URL**
   - Click "Create Web Service"
   - Wait for deployment
   - Copy the URL (e.g., `https://megablog-backend.onrender.com`)

### Option B: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Deploy to Heroku**
   ```bash
   cd backend
   heroku create megablog-backend
   heroku config:set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/megablog"
   heroku config:set JWT_SECRET="your_super_secret_jwt_key_here"
   heroku config:set NODE_ENV="production"
   heroku config:set FRONTEND_URL="https://your-frontend-domain.vercel.app"
   git push heroku main
   ```

---

## 🎨 Step 3: Frontend Deployment

### Option A: Vercel (Recommended)

1. **Update Frontend Environment**
   - Create `.env` file in root directory:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   VITE_APP_NAME=MegaBlog
   ```

2. **Push Frontend to GitHub**
   ```bash
   cd ..
   git init
   git add .
   git commit -m "Initial frontend commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/megablog-frontend.git
   git push -u origin main
   ```

3. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your frontend repository
   - Configure:
     - **Framework Preset**: `Vite`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

4. **Set Environment Variables in Vercel**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   VITE_APP_NAME=MegaBlog
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment
   - Your blog will be live!

### Option B: Netlify

1. **Deploy on Netlify**
   - Go to [Netlify](https://netlify.com)
   - Sign up with GitHub
   - Click "New site from Git"
   - Connect your frontend repository
   - Configure:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`

2. **Set Environment Variables in Netlify**
   - Go to Site settings > Environment variables
   - Add:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com/api
     VITE_APP_NAME=MegaBlog
     ```

---

## 🗄️ Step 4: Database Migration

1. **Run Migration Script**
   ```bash
   cd backend
   npm run migrate
   ```

2. **Or Create Admin Manually**
   ```bash
   cd backend
   npm run fix-admin
   ```

3. **Verify Admin Login**
   - Email: `admin@megablog.com`
   - Password: `admin123`

---

## ✅ Step 5: Verification

1. **Test Backend Health**
   ```bash
   curl https://your-backend-url.onrender.com/health
   ```

2. **Test API Endpoints**
   ```bash
   curl https://your-backend-url/api/test
   ```

3. **Test Frontend**
   - Visit your frontend URL
   - Test admin login
   - Create/edit/delete posts
   - Verify images load correctly

---

## 🔧 Environment Variables Reference

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/megablog
JWT_SECRET=your_super_secret_jwt_key_here
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
VITE_APP_NAME=MegaBlog
```

---

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Check `FRONTEND_URL` in backend environment
   - Verify frontend URL is correct in CORS configuration

2. **Database Connection**
   - Verify MongoDB connection string
   - Check IP whitelist in MongoDB Atlas
   - Ensure database user has correct permissions

3. **Image Loading Issues**
   - Check that backend image serving is working
   - Verify image routes are accessible

4. **Authentication Issues**
   - Ensure `JWT_SECRET` is set correctly
   - Check cookie settings in production

5. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for syntax errors in code

### Debug Commands:
```bash
# Check backend logs
heroku logs --tail  # (Heroku)
# Or check Render/other platform logs

# Test database connection
curl https://your-backend-url/health

# Test API endpoints
curl https://your-backend-url/api/test
```

---

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        uses: johnbeynon/render-deploy-action@v1.0.0
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 📊 Monitoring & Maintenance

1. **Monitor Performance**
   - Check Render/Heroku dashboards
   - Monitor MongoDB Atlas usage
   - Set up alerts for errors

2. **Regular Updates**
   - Update dependencies monthly
   - Check for security vulnerabilities
   - Backup database regularly

3. **Scaling Considerations**
   - MongoDB Atlas free tier limits
   - Render/Heroku free tier limitations
   - Consider paid plans for production use

---

## 🎉 Success!

Your MegaBlog is now deployed and live! 

**Your URLs:**
- **Frontend**: https://your-blog.vercel.app
- **Backend**: https://your-backend.onrender.com
- **Admin Login**: admin@megablog.com / admin123

**Next Steps:**
1. Customize your blog content
2. Add your own posts
3. Consider adding a custom domain
4. Set up monitoring and backups

Happy blogging! 🚀 