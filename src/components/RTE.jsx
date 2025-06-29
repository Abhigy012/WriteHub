import React from 'react'

export default function RTE({ name, value, onChange, label, defaultValue = "" }) {
  return (
    <div className='w-full'> 
      {label && <label className='inline-block pl-1 mb-1'>{label}</label>}
      
      <textarea
        name={name || "content"}
        value={value || defaultValue}
        onChange={onChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={15}
        placeholder="Write your post content here..."
      />
    </div>
  )
}

