# MegaBlog - Simple MERN Stack Blog

A beginner-friendly blog application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- User registration and login
- Create, read, update, and delete blog posts
- Image upload for blog posts
- Rich text editor for post content
- Responsive design

## Project Structure

```
megablog/
├── backend/          # Node.js/Express server
│   ├── models/       # MongoDB schemas
│   ├── routes/       # API routes
│   ├── middleware/   # Custom middleware
│   ├── utils/        # Utility functions
│   └── uploads/      # Uploaded images
└── src/              # React frontend
    ├── components/   # Reusable components
    ├── pages/        # Page components
    └── services/     # API service functions
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/megablog
   JWT_SECRET=your_secret_key_here
   ```

4. Start MongoDB (make sure MongoDB is installed and running)

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. In the root directory, install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React, React Router, React Hook Form
- **Styling**: Tailwind CSS
- **Rich Text Editor**: TinyMCE
- **File Upload**: Multer

## Learning Resources

This project is designed to be beginner-friendly. Key concepts to understand:

- RESTful APIs
- JWT Authentication
- File Uploads
- React Hooks
- Form Handling
- State Management (without Redux)

Enjoy building your blog! 🚀
