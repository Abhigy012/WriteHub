import React from 'react'

function LogoutBtn({ onLogout }) {
  return (
    <button
      onClick={onLogout}
      className="px-5 py-2 rounded-full text-white bg-[#6366f1] hover:bg-[#4338ca] transition-colors duration-200"
    >
      Logout
    </button>
  );
}

export default LogoutBtn