import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

function EditPost() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ title: '', content: '', status: 'active' })
  const [image, setImage] = useState(null)
  const [error, setError] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    fetch(`${API_URL}/posts/${id}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setPost(data)
        setForm({ title: data.title, content: data.content, status: data.status })
        setLoading(false)
      })
      .catch(() => {
        navigate('/')
        toast.error('Failed to load post');
      })
  }, [id, navigate])

  if (loading) return <div className="py-8 flex items-center justify-center">Loading...</div>
  if (!post) return null

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImage = e => {
    setImage(e.target.files[0])
  }

  const handleSubmit = e => {
    e.preventDefault()
    setError('')
    const data = new FormData()
    data.append('title', form.title)
    data.append('content', form.content)
    data.append('status', form.status)
    if (image) data.append('image', image)
    fetch(`${API_URL}/posts/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: data
    })
      .then(res => res.json())
      .then(updated => {
        if (updated._id) navigate(`/post/${updated._id}`)
        else {
          setError('Failed to update post')
          toast.error('Failed to update post');
        }
      })
      .catch(() => {
        navigate('/')
      })
  }

  return (
    <div className='py-8 max-w-xl mx-auto'>
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Edit Post</h1>
      {error && <div className="mb-4 text-red-500 dark:text-red-400">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600" />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" className="border p-2 rounded h-40 dark:bg-gray-800 dark:text-white dark:border-gray-600" />
        <select name="status" value={form.status} onChange={handleChange} className="border p-2 rounded dark:bg-gray-800 dark:text-white dark:border-gray-600">
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
        <input type="file" onChange={handleImage} />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
      </form>
    </div>
  )
}

export default EditPost