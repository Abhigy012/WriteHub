import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { Signup as SignupComponent } from '../components'

function Signup() {
  const outletContext = useOutletContext() || {};
  const setUser = outletContext.setUser;

  if (typeof setUser !== 'function') {
    return <div style={{color:'red',padding:'2rem'}}>Error: setUser is not available from context. Make sure App.jsx is the parent layout for this route.</div>;
  }

  return (
    <div className='py-8'>
      <SignupComponent setUser={setUser} />
    </div>
  )
}

export default Signup