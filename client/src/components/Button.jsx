import React from "react";

export default function Button({
  children,
  type = "button",
  className = "",

  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 transition duration-150 font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
