import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full p-4 bg-[#1f2937] border border-[#374151] rounded-xl hover:bg-[#374151] transition-colors duration-200 shadow-sm">
        <div className="w-full aspect-video overflow-hidden rounded-xl mb-4 flex items-center justify-center bg-[#111827]">
          <img
            src={appwriteService.getFileView(featuredImage)}
            alt={title}
            className="object-cover w-full h-full rounded-xl"
            onLoad={() => {
              console.log("Image loaded successfully for:", title);
            }}
            onError={(e) => {
              console.log("Image failed to load for:", title);
              console.log("Image URL:", e.target.src);
              console.log("Featured Image ID:", featuredImage);
            }}
          />
        </div>

        <h2 className="text-lg font-semibold text-[#f8fafc] mb-1 truncate">
          {title}
        </h2>

        {/* Optional: Uncomment if you add description or metadata */}
        {/* <p className="text-sm text-[#e2e8f0] line-clamp-2">Short content or summary...</p> */}
        {/* <span className="text-xs text-[#94a3b8]">3 mins ago • by John</span> */}
      </div>
    </Link>
  );
}

export default PostCard;
