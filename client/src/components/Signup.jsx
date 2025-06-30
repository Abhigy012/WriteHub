import React, { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { Button, Input } from './index.js'

const API_URL = import.meta.env.VITE_API_URL;

function Signup() {
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { refreshUser } = useOutletContext() || {}

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setError('')
        fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(data => {
                if (data._id) {
                    if (refreshUser) refreshUser()
                    navigate('/')
                } else {
                    setError(data.message || 'Signup failed')
                }
            })
            .catch(() => setError('Signup failed'))
    }

    return (
        <div className="max-w-md mx-auto py-8 dark:bg-gray-900 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center dark:text-white">Sign Up</h1>
            {error && <div className="mb-4 text-red-500 dark:text-red-400">{error}</div>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
                <Input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
                <Input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />
                <Button type="submit">Sign Up</Button>
            </form>
            <p className="mt-4 text-center text-sm dark:text-gray-300">Already have an account? <Link to="/login" className="text-blue-500 dark:text-blue-400">Login</Link></p>
        </div>
    )
}

export default Signup