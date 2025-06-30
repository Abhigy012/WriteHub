import React, { useState } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { Button, Input } from "./index"

const API_URL = import.meta.env.VITE_API_URL;

function Login() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { refreshUser } = useOutletContext() || {}

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = e => {
        e.preventDefault()
        setError('')
        fetch(`${API_URL}/auth/login`, {
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
                    setError(data.message || 'Login failed')
                }
            })
            .catch(() => setError('Login failed'))
    }

    return (
        <div className="max-w-md mx-auto py-8 dark:bg-gray-900 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center dark:text-white">Login</h1>
            {error && <div className="mb-4 text-red-500 dark:text-red-400">{error}</div>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
                <Input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />
                <Button type="submit">Login</Button>
            </form>
            <p className="mt-4 text-center text-sm dark:text-gray-300">Don't have an account? <Link to="/signup" className="text-blue-500 dark:text-blue-400">Sign Up</Link></p>
        </div>
    )
}

export default Login