import React from 'react';
import { Link } from 'react-router-dom';

const ActionTile = ({ to, icon, title, description, color = "primary" }) => {
    const colors = {
        primary: "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-primary-200",
        secondary: "bg-gradient-to-br from-secondary-700 to-secondary-800 text-white shadow-secondary-200",
        neutral: "bg-white text-neutral-900 border border-neutral-200 hover:border-primary-300",
    };

    return (
        <Link
            to={to}
            className={`
        relative group overflow-hidden rounded-2xl p-6 transition-all duration-300
        hover:shadow-xl hover:-translate-y-1 block h-full
        ${color === 'neutral' ? 'hover:shadow-soft' : 'shadow-lg'}
        ${colors[color]}
      `}
        >
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <div className={`
            p-3 rounded-xl w-fit mb-4 backdrop-blur-sm
            ${color === 'neutral' ? 'bg-primary-50 text-primary-600' : 'bg-white/20 text-white'}
          `}>
                        {icon}
                    </div>
                    <h3 className={`text-xl font-display font-bold mb-2 ${color === 'neutral' ? 'text-neutral-900' : 'text-white'}`}>
                        {title}
                    </h3>
                    <p className={`text-sm ${color === 'neutral' ? 'text-neutral-500' : 'text-white/90'}`}>
                        {description}
                    </p>
                </div>

                <div className="mt-4 flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Access Module</span>
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>

            {/* Decorative Blob */}
            <div className={`
        absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-40 transition-transform group-hover:scale-110
        ${color === 'neutral' ? 'bg-primary-200' : 'bg-white'}
      `}></div>
        </Link>
    );
};

export default ActionTile;
