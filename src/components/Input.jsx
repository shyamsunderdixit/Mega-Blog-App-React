/* eslint-disable react/prop-types */
import React, {useId} from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label
            className='inline-block mb-1 ml-0'
            htmlFor={id}>
            {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none
                focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}
                {...props}
                id={id} 
            />
        </div>
    )
})

export default Input

// Final Summary ✅
// This Input component is a customizable, reusable input field that:

// Accepts props like label, type, and className.
// Uses useId() to link labels to input fields properly.
// Uses forwardRef to allow external control of the input.
// Provides default styles with Tailwind CSS.
// Is fully customizable and can accept extra props like placeholder, required, etc.