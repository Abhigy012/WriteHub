import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const isLoggedIn = useSelector((state) => state.auth.status)

  useEffect(() => {
    const shouldRedirect =
      (authentication && !isLoggedIn) || (!authentication && isLoggedIn)

    if (shouldRedirect) {
      navigate(authentication ? '/login' : '/')
    } else {
      setLoading(false)
    }
  }, [isLoggedIn, navigate, authentication])

  return loading ? <h1>Loading...</h1> : <>{children}</>
}
