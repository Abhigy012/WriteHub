import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
  <button
    onClick={logoutHandler}
    className="px-5 py-2 rounded-full text-white bg-[#6366f1] hover:bg-[#4338ca] transition-colors duration-200"
  >
    Logout
  </button>
);

}

export default LogoutBtn