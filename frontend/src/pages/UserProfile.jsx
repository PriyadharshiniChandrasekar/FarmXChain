import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../services/UserService';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await UserService.getCurrentUserProfile();
            setUser(data.data);
        } catch (err) {
            setError('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center text-red-600">
                    <p>{error || 'User not found'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-8 sm:p-10 text-white">
                        <h1 className="text-3xl font-display font-bold">My Profile</h1>
                        <p className="opacity-80 mt-2">Manage your account settings</p>
                    </div>

                    <div className="px-6 py-8 sm:p-10">
                        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                            <div>
                                <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">Full Name</dt>
                                <dd className="mt-1 text-lg font-semibold text-gray-900">{user.name || 'N/A'}</dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">Email</dt>
                                <dd className="mt-1 text-lg font-semibold text-gray-900">{user.email}</dd>
                            </div>

                            <div className="sm:col-span-2">
                                <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">Role</dt>
                                <dd className="mt-1">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800`}>
                                        {user.role}
                                    </span>
                                </dd>
                            </div>

                            <div className="sm:col-span-2 border-t border-gray-200 pt-6 mt-2">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                                <div className="flex flex-wrap gap-4">
                                    {user.role === 'FARMER' && (
                                        <Link
                                            to="/farmer-profile"
                                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                                        >
                                            Manage Farm Profile
                                        </Link>
                                    )}
                                    {user.role === 'ADMIN' && (
                                        <Link
                                            to="/admin-dashboard"
                                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            Admin Dashboard
                                        </Link>
                                    )}
                                    {/* Add more role-based actions here */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
