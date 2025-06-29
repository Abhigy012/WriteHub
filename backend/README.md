# MegaBlog Backend API

A MERN stack blog backend with authentication, post management, and image handling.

## Features
- User authentication (register, login, logout)
- Post CRUD operations
- Image upload with memory storage
- JWT-based authentication
- MongoDB database

## Environment Variables
Create a `config.env` file with:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=production
```

## Installation
```bash
npm install
npm start
```

## API Endpoints
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post 