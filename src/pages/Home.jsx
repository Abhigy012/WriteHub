import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authStatus) {
      appwriteService
        .getPosts()
        .then((posts) => {
          if (posts) {
            setPosts(posts.documents);
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [authStatus]);

  // Not logged in view
  if (!authStatus) {
    return (
      <div className="w-full py-16 bg-gradient-to-br from-slate-50 to-gray-100">
        <Container>
          <div className="flex items-center justify-center min-h-96">
            <div className="max-w-lg mx-auto text-center">
              <div className="p-12 border shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl border-white/20">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h1 className="mb-4 text-3xl font-bold text-transparent bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text">
                  Welcome to Our Stories
                </h1>
                <p className="mb-8 text-lg leading-relaxed text-gray-600">
                  Login to discover amazing posts and join our community of
                  writers and readers.
                </p>
                <Link
                  to="/signup"
                  className="inline-flex items-center px-6 py-3 font-semibold text-white transition-all duration-300 transform shadow-lg cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:shadow-xl hover:scale-105"
                >
                  <span>Get Started</span>
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Logged in but no posts
  if (authStatus && posts.length === 0) {
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

  // Logged in and posts available
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
              key={post.$id}
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
