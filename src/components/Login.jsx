import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api.js'
import { Button, Input, Logo } from "./index"

function Login({ setUser }) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}
        
        if (!formData.email) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email"
        }
        
        if (!formData.password) {
            newErrors.password = "Password is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const login = async (e) => {
        e.preventDefault()
        
        if (!validateForm()) {
            return
        }

        setLoading(true)
        setError("")
        
        try {
            const response = await authAPI.login(formData)
            
            // Safety check for setUser
            if (typeof setUser === 'function') {
                setUser(response)
                navigate('/')
            } else {
                console.error('setUser is not a function:', setUser)
                setError('Authentication error: Unable to set user state')
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    // Safety check for setUser prop
    if (typeof setUser !== 'function') {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-600 text-center p-8">
                    <h2 className="text-xl font-bold mb-4">Configuration Error</h2>
                    <p>setUser function is not available. Please check your app configuration.</p>
                    <p className="mt-2 text-sm">setUser type: {typeof setUser}</p>
                </div>
            </div>
        )
    }

    return (
        <div className='flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-slate-50 to-gray-100'>
            <div className='mx-auto w-full max-w-lg bg-white rounded-2xl p-10 border border-gray-200 shadow-xl'>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-gray-800">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-gray-600">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-600 transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-4 text-center bg-red-50 p-3 rounded-lg">{error}</p>}
                <form onSubmit={login} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            type="email"
                            error={errors.email}
                        />
                        <Input
                            label="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            type="password"
                            placeholder="Enter your password"
                            error={errors.password}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login