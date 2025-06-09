import React from "react";
import logo from "../assets/WriteHub.png";
function Logo({ width = "100px" }) {
  return (
    <div>
      <img
        src={logo}
        alt="WriteHub"
        style={{ width }}
        className="rounded-full aspect-square"
      />
    </div>
  );
}

export default Logo;
