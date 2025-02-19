import PropTypes from 'prop-types';

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button type={type} className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    className: PropTypes.string,
};

export default Button;

// 📌 How It Works?
// 1️⃣ Accepts Props with Default Values

// If no values are provided, it defaults to a blue button (bg-blue-600) with white text.
// 2️⃣ Uses Tailwind CSS for Styling

// The button styling is dynamic because of template literals `${bgColor} ${textColor}`.
// 3️⃣ Spreads Extra Props (...props)

// This ensures that additional attributes like onClick or disabled work without explicitly defining them.
// 4️⃣ Uses PropTypes for Type Safety

// Ensures children is required and other props have expected data types.

