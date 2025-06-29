import React, { useState } from "react";
import { Button, Input, RTE, Select } from "..";
import { postsAPI, getImageUrl } from "../../services/api.js";
import { useNavigate } from "react-router-dom";

export default function PostForm({ post }) {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    content: post?.content || "",
    status: post?.status || "active",
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (errors.image) {
      setErrors(prev => ({
        ...prev,
        image: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }
    if (!post && !image) {
      newErrors.image = "Featured image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('status', formData.status);
      
      if (image) {
        data.append('image', image);
      }

      if (post) {
        // Update existing post
        const updatedPost = await postsAPI.updatePost(post._id, data);
        navigate(`/post/${updatedPost._id}`);
      } else {
        // Create new post
        const newPost = await postsAPI.createPost(data);
        navigate(`/post/${newPost._id}`);
      }
    } catch (error) {
      console.error("Post submission error:", error);
      setError(error.message || "Failed to save post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {post ? "Edit Post" : "Create New Post"}
        </h1>
        <p className="text-gray-600 mt-2">
          {post ? "Update your post content and settings" : "Share your thoughts with the world"}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={submit} className="flex flex-wrap gap-8">
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <Input
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter your post title"
              className="mb-6"
              error={errors.title}
            />

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <RTE
                name="content"
                value={formData.content}
                onChange={(e) => handleInputChange(e)}
                defaultValue={formData.content}
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content}</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Post Settings</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                <Input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  onChange={handleImageChange}
                  error={errors.image}
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.image}
                  </p>
                )}
              </div>

              {(image || post?.featuredImage) && (
                <div className="w-full">
                  <img
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : getImageUrl(post.featuredImage)
                    }
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                </div>
              )}

              <Select
                options={["active", "inactive"]}
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                error={errors.status}
              />

              <Button
                type="submit"
                className={`w-full ${post ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {post ? "Updating..." : "Creating..."}
                  </div>
                ) : (
                  post ? "Update Post" : "Publish Post"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
