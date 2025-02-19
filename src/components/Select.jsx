/* eslint-disable react/prop-types */

import React, { useId } from 'react';

const Select = React.forwardRef(function Select(
    { options, label, className = '', ...props },
    ref
) {
    const id = useId();

    return (
        <div className="w-full">
            {/* Fixed: Properly display the label text */}
            {label && (
                <label htmlFor={id} className="mb-1 block font-medium text-gray-700">
                    {label}
                </label>
            )}

            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50
                    duration-200 border border-gray-200 w-full ${className}`}
            >
                {/* Fixed: Ensure options are mapped correctly */}
                {options?.map((option) => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default Select;

// Final Summary ✅
// This Select component is a reusable dropdown that:

// Accepts props like options, label, and className.
// Generates a unique ID for accessibility.
// Maps options dynamically into <option> elements.
// Uses forwardRef to allow external control.
// Provides a clean, customizable design using Tailwind CSS.
