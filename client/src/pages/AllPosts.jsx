import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/posts`)
      .then(res => res.json())
      .then(data => setPosts(data.posts || []))
      .catch(() => {
        toast.error("Failed to load posts");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="w-full py-8 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="w-full py-8">
      <h1 className="text-2xl font-bold mb-4 text-center dark:text-white">All Posts</h1>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <Link key={post._id} to={`/post/${post._id}`} className="block border rounded p-4 bg-white dark:bg-gray-800 dark:border-gray-700">
              <img src={post.featuredImage} alt={post.title} className="w-full h-40 object-cover rounded mb-2" />
              <h2 className="text-lg font-semibold dark:text-white">{post.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">By {post.author?.name || 'Unknown'} - {new Date(post.createdAt).toLocaleDateString()}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">👁️ {post.views || 0} views</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-40">
          <p className="mb-2 text-lg font-medium dark:text-white">No posts found</p>
          <Link to="/add-post" className="px-4 py-2 bg-blue-500 text-white rounded">Create Post</Link>
        </div>
      )}
    </div>
  );
}

export default AllPosts;
