import React, { useState, useEffect } from 'react'
import './App.css'
import { authAPI } from "./services/api.js"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await authAPI.getCurrentUser();
          setUser(userData);
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);
  
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const contextValue = {
    user,
    setUser
  };

  return (
    <div className='flex flex-wrap content-between min-h-screen'>
      <div className='block w-full'>
        <Header user={user} onLogout={logout} />
        <main>
          <Outlet context={contextValue} />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
