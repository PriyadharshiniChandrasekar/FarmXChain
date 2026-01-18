import React, { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import Logo from '../Logo';
import AuthService from '../../services/AuthService';

const NavItem = ({ to, icon, label, isActive }) => (
    <Link
        to={to}
        className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
      ${isActive
                ? 'bg-gradient-to-r from-primary-50 to-primary-100/50 text-primary-700 shadow-sm ring-1 ring-primary-200'
                : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900'
            }
    `}
    >
        <span className={`mr-3 ${isActive ? 'text-primary-600' : 'text-neutral-400 group-hover:text-neutral-600'}`}>
            {icon}
        </span>
        {label}
    </Link>
);

const Shell = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const currentUser = AuthService.getCurrentUser();
    const isAuthenticated = AuthService.isAuthenticated();

    // If not authenticated, just render children (for login/register pages which handle their own layout)
    const isAuthPage = ['/login', '/register'].includes(location.pathname);
    if (!isAuthenticated || isAuthPage) {
        return <div className="min-h-screen bg-surface-50">{children}</div>;
    }

    const handleLogout = () => {
        AuthService.logout();
        window.location.href = '/login';
    };

    const menuItems = [
        {
            path: '/dashboard',
            label: 'Dashboard',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            )
        },
        // Add role-based items here dynamically if needed
        {
            path: '/farmer-list',
            label: 'Farmers Directory',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        }
    ];

    return (
        <div className="flex h-screen bg-surface-50 font-sans overflow-hidden">
            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex flex-col w-72 bg-white border-r border-surface-200">
                <div className="flex items-center h-20 px-8 border-b border-surface-100">
                    <Logo />
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                    {menuItems.map((item) => (
                        <NavItem
                            key={item.path}
                            to={item.path}
                            icon={item.icon}
                            label={item.label}
                            isActive={location.pathname === item.path}
                        />
                    ))}
                </div>

                <div className="p-4 border-t border-neutral-100">
                    <div className="flex items-center px-4 py-3 mb-2 bg-neutral-50 rounded-xl border border-neutral-100">
                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                            {currentUser?.email?.[0].toUpperCase()}
                        </div>
                        <div className="ml-3 overflow-hidden">
                            <p className="text-sm font-medium text-neutral-900 truncate">{currentUser?.email}</p>
                            <p className="text-xs text-neutral-500 truncate capitalize">{currentUser?.role?.toLowerCase()}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-surface-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between h-16 px-4 bg-white border-b border-surface-200">
                    <Logo size="small" />
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="p-2 text-surface-500 hover:bg-surface-100 rounded-lg"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </header>

                {/* Mobile menu overlay would go here - simplified for now */}

                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                    {/* Background decorative pattern */}
                    <div className="absolute inset-0 bg-hero-pattern opacity-40 pointer-events-none z-0"></div>
                    <div className="relative z-10 max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Shell;
