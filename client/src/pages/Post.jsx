import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useOutletContext } from "react-router-dom";
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const outletContext = useOutletContext();
  const user = outletContext?.user;

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }
    fetch(`${API_URL}/posts/${id}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load post");
        navigate("/");
      });
  }, [id]);

  const deletePost = () => {
    fetch(`${API_URL}/posts/${post._id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          navigate("/");
        }
      })
      .catch(() => {
        toast.error("Failed to delete post");
        navigate("/");
      });
  };

  if (loading) {
    return <div className="py-8 flex items-center justify-center">Loading...</div>;
  }

  if (!post) {
    return <div className="py-8 flex items-center justify-center">Post not found</div>;
  }

  const isAuthor = user && post.author && (user._id === post.author._id);

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <img
        src={post.featuredImage}
        alt={post.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      {isAuthor && (
        <div className="mb-4 flex gap-2">
          <Link to={`/edit-post/${post._id}`} className="px-4 py-2 bg-green-500 text-white rounded">Edit</Link>
          <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={deletePost}>Delete</button>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-2 dark:text-white">{post.title}</h1>
      <p className="text-gray-600 mb-4 dark:text-gray-400">By {post.author?.name || 'Unknown'} - {new Date(post.createdAt).toLocaleDateString()}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">👁️ {post.views || 0} views</p>
      <div className="bg-white dark:bg-gray-900 p-4 rounded whitespace-pre-line text-gray-900 dark:text-white">{post.content}</div>
    </div>
  );
}
