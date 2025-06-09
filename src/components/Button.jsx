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
      className={`px-4 py-2 rounded-lg font-medium bg-[#6366f1] text-white hover:bg-[#4338ca] transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
