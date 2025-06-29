import React, { useEffect, useState } from "react";
import { postsAPI } from "../services/api.js";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await postsAPI.getAllPosts();
        setPosts(response.posts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="w-full py-16 bg-gradient-to-br from-slate-50 to-gray-100">
        <Container>
          <div className="flex items-center justify-center min-h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
          </div>
        </Container>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full py-16 bg-gradient-to-br from-slate-50 to-gray-100">
        <Container>
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 text-red-500">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // No posts
  if (posts.length === 0) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-col items-center justify-center w-full h-[40vh] bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
            <svg
              className="w-16 h-16 mb-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17v-2a4 4 0 014-4h.5a3.5 3.5 0 000-7H7"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17H5a2 2 0 01-2-2V7a2 2 0 012-2h4"
              />
            </svg>
            <p className="mb-1 text-lg font-medium text-white">
              No posts found
            </p>
            <p className="mb-4 text-sm text-gray-400">
              Once posts are published, they will appear here.
            </p>
            <Link
              to="/add-post"
              className="inline-flex items-center px-5 py-2 font-semibold text-white transition-all duration-300 transform shadow-md bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:shadow-lg hover:scale-105"
            >
              <span>Create Post</span>
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  // Posts available
  return (
    <div className="w-full py-16 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <Container>
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="p-2 m-4 text-5xl font-bold text-transparent bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text">
            Discover Amazing Stories
          </h1>
          <p className="max-w-2xl mx-auto text-xl leading-relaxed text-gray-600">
            Explore our curated collection of inspiring posts and engaging
            content
          </p>
          <div className="w-24 h-1 mx-auto mt-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="relative transition-all duration-300 transform group hover:scale-105 hover:z-10"
            >
              <div className="overflow-hidden transition-all duration-300 border shadow-lg bg-white/70 backdrop-blur-sm rounded-2xl hover:shadow-2xl border-white/50 group-hover:bg-white/90">
                <PostCard {...post} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
