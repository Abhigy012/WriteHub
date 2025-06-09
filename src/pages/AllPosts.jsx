import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        {posts.length > 0 ? (
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="w-full p-2 sm:w-1/2 lg:w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : (
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
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
