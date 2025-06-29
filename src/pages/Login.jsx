import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { Login as LoginComponent } from '../components'

function Login() {
  const context = useOutletContext();
  const setUser = context?.setUser;

  if (!setUser || typeof setUser !== 'function') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-center p-8">
          <h2 className="text-xl font-bold mb-4">Configuration Error</h2>
          <p>setUser function is not available. Please check your app configuration.</p>
          <p className="mt-2 text-sm">Context available: {context ? 'Yes' : 'No'}</p>
          <p className="mt-2 text-sm">setUser type: {typeof setUser}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='py-8'>
      <LoginComponent setUser={setUser} />
    </div>
  )
}

export default Login