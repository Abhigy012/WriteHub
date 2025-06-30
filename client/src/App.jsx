import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const refreshUser = useCallback(() => {
    fetch(`${API_URL}/auth/me`, { credentials: 'include' })
      .then(res => res.ok ? res.json() : null)
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const handleLogout = () => {
    fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    }).then(() => {
      setUser(null);
      refreshUser();
      navigate('/login');
    });
  };

  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
      <header className="bg-blue-600 dark:bg-gray-800 text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-10">
        <Link to="/" className="font-bold text-2xl tracking-tight drop-shadow-sm pl-2 focus:outline-none">My <span className="text-yellow-300 dark:text-yellow-400">Blog</span></Link>
        <nav className="flex gap-6 items-center">
          <Link to="/" className="hover:underline underline-offset-4 transition font-medium">Home</Link>
          <Link to="/all-posts" className="hover:underline underline-offset-4 transition font-medium">All Posts</Link>
          {user ? (
            <>
              <Link to="/add-post" className="hover:underline underline-offset-4 transition font-medium">Create Post</Link>
              <button onClick={handleLogout} className="bg-blue-500 dark:bg-gray-700 text-white font-medium px-4 py-1 rounded-lg shadow-sm hover:bg-blue-600 dark:hover:bg-gray-600 transition ml-2">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline underline-offset-4 transition font-medium">Login</Link>
              <Link to="/signup" className="hover:underline underline-offset-4 transition font-medium">Signup</Link>
            </>
          )}
          <button
            onClick={() => setDarkMode(m => !m)}
            className="ml-4 px-2 py-1 rounded border border-white/30 bg-white/10 hover:bg-white/20 dark:bg-gray-700 dark:border-gray-500 dark:hover:bg-gray-600 transition text-white text-sm"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '🌙' : '☀️'}
          </button>
        </nav>
      </header>
      <main className="flex-1">
        <Outlet context={{ refreshUser, user }} />
      </main>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar theme="colored" />
      <footer className="bg-gray-200 dark:bg-gray-800 text-center p-4 text-sm border-t border-gray-300 dark:border-gray-700 mt-8 shadow-inner text-gray-700 dark:text-gray-300">&copy; {new Date().getFullYear()} My Blog. Powered by MERN + Cloudinary.</footer>
    </div>
  );
}

export default App;
