import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user') || 'null');
  const isAuthor = post && userData ? post.author._id === userData._id : false;

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }
    
    // Create AbortController to cancel previous requests
    const abortController = new AbortController();
    
    fetch(`http://localhost:5000/api/posts/${id}`, {
      signal: abortController.signal
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Post not found');
        }
        return res.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          return;
        }
        console.error('Error fetching post:', err);
        navigate("/");
      });

    // Cleanup function to abort request if component unmounts or id changes
    return () => {
      abortController.abort();
    };
  }, [id, navigate]);

  const deletePost = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch(`http://localhost:5000/api/posts/${post._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        navigate("/");
      }
    })
    .catch(err => {
      console.error('Error deleting post:', err);
    });
  };

  if (loading) {
    return (
      <div className="py-8">
        <Container>
          <div className="text-center">Loading...</div>
        </Container>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-8">
        <Container>
          <div className="text-center">Post not found</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <div className="relative flex justify-center w-full p-2 mb-4 border rounded-xl">
          <img
            src={`http://localhost:5000/api/posts/image/${post.featuredImage}`}
            alt={post.title}
            className="object-cover w-full h-64 max-w-4xl mx-auto md:h-80 rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post._id}`}>
                <Button className="mr-3 bg-green-500">Edit</Button>
              </Link>
              <Button className="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p className="text-gray-600 mt-2">
            By {post.author?.name || 'Unknown'} • {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </Container>
    </div>
  );
}
