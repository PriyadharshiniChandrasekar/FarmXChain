import React, { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';
import ActionTile from '../components/smart-ui/ActionTile';
import CropList from '../components/CropList';
import CropService from '../services/CropService';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [crops, setCrops] = useState([]);
  const [loadingCrops, setLoadingCrops] = useState(false);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);

    if (currentUser && ['DISTRIBUTOR', 'RETAILER', 'CONSUMER'].includes(currentUser.role)) {
      loadAllCrops();
    }
  }, []);

  const loadAllCrops = async () => {
    try {
      setLoadingCrops(true);
      const response = await CropService.getAllCrops();
      setCrops(response.data || []);
    } catch (err) {
      console.error('Error loading crops:', err);
    } finally {
      setLoadingCrops(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-900 to-secondary-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-display font-bold mb-2">
            Welcome back, {user.name || user.email.split('@')[0]}
          </h1>
          <p className="text-primary-100 flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
            Node Status: <span className="font-semibold ml-1">Online</span>
            <span className="mx-3 opacity-50">|</span>
            Role: <span className="font-semibold capitalize ml-1">{user.role?.toLowerCase()}</span>
          </p>
        </div>

        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-20 -mb-10 w-32 h-32 bg-secondary-400 opacity-10 rounded-full blur-2xl"></div>
      </div>

      {/* Action Grid - Role Based */}
      <div>
        <h2 className="text-xl font-display font-bold text-neutral-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {user.role === 'FARMER' && (
            <>
              <ActionTile
                to="/farmer-profile"
                title="Farmer Profile"
                description="Manage your identity and certifications on the blockchain."
                color="primary"
                icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
              />
              <ActionTile
                to="/crop-management"
                title="Crop Management"
                description="Register produce batches and track supply chain movement."
                color="secondary"
                icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
              />
            </>
          )}

          {user.role === 'ADMIN' && (
            <>
              <ActionTile
                to="/user-management"
                title="User Management"
                description="Oversee platform access and role assignments."
                color="primary"
                icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>}
              />
              <ActionTile
                to="/farmer-verification"
                title="Verification Center"
                description="Review Farmer KYC and land documents."
                color="secondary"
                icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              />
              <ActionTile
                to="/statistics"
                title="Platform Analytics"
                description="Deep dive into supply chain metrics."
                color="neutral"
                icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
              />
            </>
          )}


          {['DISTRIBUTOR', 'RETAILER', 'CONSUMER'].includes(user.role) && (
            <ActionTile
              to="/farmer-list"
              title="Farmers Directory"
              description="Explore the network of verified producers."
              color="neutral"
              icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            />
          )}

        </div>
      </div>

      {/* Produce Explorer - Universal Visibility */}
      {['DISTRIBUTOR', 'RETAILER', 'CONSUMER'].includes(user.role) && (
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-display font-bold text-neutral-900">Produce Explorer</h2>
              <p className="text-neutral-500 text-sm">Real-time blockchain-verified produce from our network of farmers.</p>
            </div>
          </div>

          {loadingCrops ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <CropList crops={crops} />
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
