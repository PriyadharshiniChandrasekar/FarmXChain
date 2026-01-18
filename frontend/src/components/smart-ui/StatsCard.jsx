import React from 'react';

const StatsCard = ({ title, value, trend, icon, trendUp = true }) => {
    return (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-soft hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 bg-gradient-to-br from-primary-50/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="flex items-center justify-between mb-4 relative z-10">
                <h4 className="text-neutral-500 font-medium text-sm uppercase tracking-wider">{title}</h4>
                <div className="text-primary-600 p-2 bg-primary-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
            </div>
            <div className="flex items-baseline space-x-2 relative z-10">
                <span className="text-3xl font-display font-bold text-neutral-900 tracking-tight">{value}</span>
                {trend && (
                    <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${trendUp ? 'bg-primary-50 text-primary-700' : 'bg-red-50 text-red-700'}`}>
                        {trend}
                    </span>
                )}
            </div>
        </div>
    );
};

export default StatsCard;
