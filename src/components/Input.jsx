import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    error,
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='inline-block mb-1 pl-1 text-sm font-medium text-gray-700' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-gray-900 outline-none focus:bg-gray-50 duration-200 border w-full ${
                error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
            } ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    )
})

export default Input