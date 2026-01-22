import React, { useState, useEffect } from 'react';
import CropService from '../services/CropService';

const CropList = ({ crops: initialCrops, showVerification = true }) => {
  const [crops, setCrops] = useState(initialCrops || []);
  const [verificationStatus, setVerificationStatus] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialCrops) {
      setCrops(initialCrops);
    }
  }, [initialCrops]);

  const verifyBlockchain = async (cropId) => {
    try {
      setLoading(true);
      const response = await CropService.verifyBlockchainRecord(cropId);
      setVerificationStatus(prev => ({
        ...prev,
        [cropId]: response.data
      }));
    } catch (error) {
      console.error('Error verifying blockchain:', error);
      setVerificationStatus(prev => ({
        ...prev,
        [cropId]: false
      }));
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (crops.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No crops found</h3>
        <p className="mt-1 text-sm text-gray-500">Add your first crop to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {crops.map((crop) => (
        <div key={crop.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col">
          {/* Crop Image */}
          <div className="h-48 w-full relative bg-gray-100">
            {crop.imageUrl ? (
              <img
                src={crop.imageUrl.startsWith('http') ? crop.imageUrl : `/api/v1${crop.imageUrl}`}
                alt={crop.cropName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}

            {/* Blockchain Badge */}
            {crop.blockchainHash && (
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center shadow-sm">
                <svg className="h-4 w-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-[10px] text-green-700 font-bold uppercase tracking-wider">Verified</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-900 truncate">{crop.cropName}</h3>
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {crop.quantityKg} kg
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002-2z" />
                </svg>
                {formatDate(crop.harvestDate)}
              </div>

              <div className="flex items-center">
                <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate">{crop.originLocation || 'Unknown'}</span>
                {crop.latitude && crop.longitude && (
                  <a
                    href={`https://www.google.com/maps?q=${crop.latitude},${crop.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-600 hover:text-blue-500 font-medium whitespace-nowrap"
                  >
                    View Map
                  </a>
                )}
              </div>

              {crop.farmer && (
                <div className="flex items-center">
                  <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {crop.farmer.farmName}
                </div>
              )}
            </div>

            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-end">
              {showVerification && crop.blockchainHash && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => verifyBlockchain(crop.id)}
                    disabled={loading}
                    className="text-xs font-bold text-gray-700 hover:text-green-600 transition-colors"
                  >
                    {loading ? '...' : 'Re-verify'}
                  </button>
                  {verificationStatus[crop.id] !== undefined && (
                    <span className={`text-[10px] font-bold ${verificationStatus[crop.id] ? 'text-green-600' : 'text-red-600'}`}>
                      {verificationStatus[crop.id] ? '✓ Valid' : '✗ Failed'}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CropList;
