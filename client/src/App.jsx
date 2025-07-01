import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WriteHubLogo from './assets/WriteHub.png';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [navOpen, setNavOpen] = useState(false);
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
      <header className="bg-blue-600 dark:bg-gray-800 text-white p-2 sm:p-4 shadow-md sticky top-0 z-10">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl sm:text-2xl tracking-tight drop-shadow-sm focus:outline-none">
            <img src={WriteHubLogo} alt="WriteHub Logo" className="h-7 w-7 sm:h-8 sm:w-auto" />
            <span className="text-yellow-300 dark:text-yellow-400 whitespace-nowrap">WriteHub</span>
          </Link>
          <button
            className="sm:hidden flex flex-col justify-center items-center ml-2"
            onClick={() => setNavOpen(o => !o)}
            aria-label="Toggle navigation menu"
          >
            <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${navOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${navOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all ${navOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
          <nav className="hidden sm:flex gap-6 items-center">
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
        </div>
        {navOpen && (
          <nav className="sm:hidden flex flex-col gap-2 mt-2 px-2 pb-2 animate-fade-in bg-blue-600 dark:bg-gray-800 rounded shadow">
            <Link to="/" className="py-2 px-2 rounded hover:bg-blue-700 dark:hover:bg-gray-700 transition" onClick={() => setNavOpen(false)}>Home</Link>
            <Link to="/all-posts" className="py-2 px-2 rounded hover:bg-blue-700 dark:hover:bg-gray-700 transition" onClick={() => setNavOpen(false)}>All Posts</Link>
            {user ? (
              <>
                <Link to="/add-post" className="py-2 px-2 rounded hover:bg-blue-700 dark:hover:bg-gray-700 transition" onClick={() => setNavOpen(false)}>Create Post</Link>
                <button onClick={() => { handleLogout(); setNavOpen(false); }} className="w-full text-left py-2 px-2 rounded bg-blue-500 dark:bg-gray-700 text-white font-medium hover:bg-blue-600 dark:hover:bg-gray-600 transition">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="py-2 px-2 rounded hover:bg-blue-700 dark:hover:bg-gray-700 transition" onClick={() => setNavOpen(false)}>Login</Link>
                <Link to="/signup" className="py-2 px-2 rounded hover:bg-blue-700 dark:hover:bg-gray-700 transition" onClick={() => setNavOpen(false)}>Signup</Link>
              </>
            )}
            <button
              onClick={() => { setDarkMode(m => !m); setNavOpen(false); }}
              className="mt-2 px-2 py-1 rounded border border-white/30 bg-white/10 hover:bg-white/20 dark:bg-gray-700 dark:border-gray-500 dark:hover:bg-gray-600 transition text-white text-sm w-full text-left"
              aria-label="Toggle dark mode"
            >
              {darkMode ? '🌙 Dark' : '☀️ Light'}
            </button>
          </nav>
        )}
      </header>
      <main className="flex-1">
        <Outlet context={{ refreshUser, user }} />
      </main>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar theme="colored" />
      <footer className="bg-gray-200 dark:bg-gray-800 text-center p-4 text-sm border-t border-gray-300 dark:border-gray-700 mt-8 shadow-inner text-gray-700 dark:text-gray-300">&copy; {new Date().getFullYear()} WriteHub. Powered by MERN + Cloudinary.</footer>
    </div>
  );
}

export default App;
