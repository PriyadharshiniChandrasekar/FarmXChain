import React from 'react';

const Logo = ({ className = "", size = "medium", textVisible = true }) => {
  const sizes = {
    small: "h-8",
    medium: "h-10",
    large: "h-14"
  };

  const iconSizes = {
    small: 32,
    medium: 40,
    large: 56
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative flex items-center justify-center text-primary-600 ${sizes[size]}`}>
        <svg
          width={iconSizes[size]}
          height={iconSizes[size]}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          {/* Abstract Leaf Shape */}
          <path d="M20 4C11.1634 4 4 11.1634 4 20C4 28.8366 11.1634 36 20 36C26.5 36 36 32 36 20C36 10 28 4 20 4Z" fill="white" />
          <path d="M20 4C11.1634 4 4 11.1634 4 20C4 28.8366 11.1634 36 20 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

          {/* Blockchain Nodes Connection */}
          <path d="M20 10V30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M12 16L28 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M12 24L28 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

          {/* Leaf details */}
          <path d="M36 20C36 10 28 4 20 4C24 4 28 8 28 14C28 20 36 20 36 20Z" fill="currentColor" fillOpacity="0.1" />
          <circle cx="20" cy="20" r="3" fill="currentColor" />
          <circle cx="12" cy="16" r="2" fill="#0f172a" /> {/* Secondary Navy Accent */}
          <circle cx="28" cy="24" r="2" fill="#0f172a" />
        </svg>
      </div>

      {textVisible && (
        <div className="flex flex-col">
          <span className={`font-display font-bold leading-none tracking-tight ${size === 'small' ? 'text-lg' : size === 'large' ? 'text-3xl' : 'text-xl'
            }`}>
            Farm<span className="text-primary-600">X</span>Chain
          </span>
          <span className={`font-sans font-medium tracking-wider uppercase opacity-70 ${size === 'small' ? 'text-[0.5rem]' : size === 'large' ? 'text-xs' : 'text-[0.6rem]'
            }`}>
            Smart Agriculture
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
