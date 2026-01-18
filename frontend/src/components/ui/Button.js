import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-md shadow-primary-200 border border-transparent rounded-xl relative overflow-hidden group",
        secondary: "bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-200 focus:ring-primary-500 shadow-sm rounded-xl",
        outline: "bg-transparent text-primary-600 border border-primary-600 hover:bg-primary-50 focus:ring-primary-500 rounded-xl",
        ghost: "bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 focus:ring-neutral-500 rounded-lg",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm border border-transparent rounded-xl",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    };

    const classes = `
    ${baseStyles}
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.md}
    ${className}
  `;

    return (
        <button className={classes.trim()} {...props}>
            {children}
        </button>
    );
};

export default Button;
