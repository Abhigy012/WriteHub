# WriteHub Frontend

React frontend for the WriteHub application, built with Vite and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your backend URL
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Build for deployment

## 🌐 Environment Variables

Create a `.env` file in the frontend directory:

```env
# Development
VITE_API_URL=http://localhost:5000/api

# Production (update with your backend URL)
# VITE_API_URL=https://your-backend-domain.onrender.com/api
# VITE_APP_NAME=MegaBlog
```

## 🚀 Deployment to Vercel

### Option 1: Deploy from GitHub

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial frontend commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/megablog-frontend.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your `megablog-frontend` repository
   - Configure:
     - **Framework Preset**: `Vite`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

3. **Set Environment Variables in Vercel**
   - Go to project settings
   - Add environment variables:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com/api
     VITE_APP_NAME=MegaBlog
     ```

4. **Deploy**
   - Click "Deploy"
   - Your frontend will be live!

### Option 2: Deploy with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts**
   - Link to existing project or create new
   - Set environment variables
   - Deploy

## 📁 Project Structure

```
frontend/
├── src/                 # Source code
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── services/       # API service functions
│   └── main.jsx        # Entry point
├── public/             # Static assets
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── package.json        # Dependencies and scripts
└── vercel.json         # Vercel deployment configuration
```

## 🎨 Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **html-react-parser** - HTML parsing

## 🔧 Configuration Files

### Vite Configuration (`vite.config.js`)
- Optimized build settings
- Code splitting configuration
- Development server settings

### Vercel Configuration (`vercel.json`)
- Build and deployment settings
- Redirect rules for SPA
- Headers configuration

### Tailwind Configuration (`tailwind.config.js`)
- Custom theme settings
- Content paths
- Plugin configuration

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for syntax errors

2. **Environment Variables**
   - Ensure `.env` file exists
   - Verify variable names start with `VITE_`
   - Check Vercel environment variables

3. **API Connection Issues**
   - Verify `VITE_API_URL` is correct
   - Check backend is running
   - Test API endpoints directly

### Debug Commands

```bash
# Check build locally
npm run build

# Preview production build
npm run preview

# Check for linting issues
npm run lint

# Test environment variables
echo $VITE_API_URL
```

## 📚 API Integration

The frontend communicates with the backend through the following endpoints:

- **Authentication**: `/api/auth/*`
- **Posts**: `/api/posts/*`
- **Images**: `/api/posts/image/*`

All API calls are configured in `src/services/api.js` and use the `VITE_API_URL` environment variable.

## 🎯 Next Steps

After deploying the frontend:

1. **Update backend CORS settings** with your frontend URL
2. **Test all functionality** (login, posts, images)
3. **Set up custom domain** (optional)
4. **Configure monitoring** and analytics

## 📄 License

This project is part of the WriteHub application and is licensed under the MIT License. 