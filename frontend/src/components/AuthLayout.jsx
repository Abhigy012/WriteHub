import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api.js'

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to get current user from server
        const user = await authAPI.getCurrentUser()
        setIsLoggedIn(true)
        
        const shouldRedirect = !authentication // If not requiring auth but user is logged in
        
        if (shouldRedirect) {
          navigate('/')
        } else {
          setLoading(false)
        }
      } catch (error) {
        // User is not authenticated
        setIsLoggedIn(false)
        
        const shouldRedirect = authentication // If requiring auth but user is not logged in
        
        if (shouldRedirect) {
          navigate('/login')
        } else {
          setLoading(false)
        }
      }
    }

    checkAuth()
  }, [navigate, authentication])

  return loading ? <h1>Loading...</h1> : <>{children}</>
}
