import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Add timeout to prevent hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(`${API_URL}/posts?limit=6`, {
          credentials: 'include',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (err) {
        if (err.name === 'AbortError') {
          setError("Request timed out. Please try again.");
          toast.error("Request timed out. Please try again.");
        } else {
          setError("Failed to load posts");
          toast.error("Failed to load posts");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full py-8 px-4 sm:px-8 flex flex-col items-center">
      {/* Hero Section */}
      <div className="w-full max-w-3xl flex flex-col items-center mb-10">
        <img src="/images/landing-hero.jpg" alt="Landing Hero" className="w-full max-h-72 object-cover rounded-lg shadow mb-6" />
        <h1 className="text-3xl font-bold text-center mb-2 dark:text-white">Welcome to WriteHub</h1>
        <p className="text-center text-lg text-gray-700 dark:text-gray-300 mb-4">A simple MERN blog platform. Create, share, and explore posts from the community.</p>
      </div>
      {/* Posts Section */}
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">All Posts</h2>
        {loading ? (
          <div className="w-full py-16 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading posts...</p>
            </div>
          </div>
        ) : error ? (
          <div className="w-full py-8 flex flex-col items-center justify-center">
            <p className="mb-4 text-lg font-medium text-red-600 dark:text-red-400">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Try Again
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="w-full py-8 flex flex-col items-center justify-center">
            <p className="mb-2 text-lg font-medium dark:text-white">No posts found</p>
            <Link to="/add-post" className="px-4 py-2 bg-blue-500 text-white rounded">Create Post</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 pb-4">
            {posts.map(post => (
              <Link key={post._id} to={`/post/${post._id}`} className="block border rounded p-4 bg-white dark:bg-gray-800 dark:border-gray-700 min-w-[280px] max-w-md hover:shadow-lg transition-shadow">
                <img 
                  src={post.featuredImage} 
                  alt={post.title} 
                  className="w-full h-40 object-cover rounded mb-2"
                  loading="lazy" // Add lazy loading for images
                />
                <h3 className="text-lg font-semibold dark:text-white">{post.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">By {post.author?.name || 'Unknown'} - {new Date(post.createdAt).toLocaleDateString()}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">👁️ {post.views || 0} views</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
