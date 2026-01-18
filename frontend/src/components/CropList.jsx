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
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {crops.map((crop) => (
          <li key={crop.id} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{crop.cropName}</h3>
                    <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Quantity:</span> {crop.quantityKg} kg
                      </div>
                      <div>
                        <span className="font-medium">Harvest Date:</span> {formatDate(crop.harvestDate)}
                      </div>
                      <div>
                        <span className="font-medium">Origin:</span> {crop.originLocation || 'Not specified'}
                      </div>
                      <div>
                        <span className="font-medium">Quality Data:</span> {crop.qualityData || 'Not specified'}
                      </div>
                    </div>
                    {crop.qualityCertificateUrl && (
                      <div className="mt-2">
                        <span className="font-medium text-sm text-gray-600">Certificate:</span>
                        <a
                          href={crop.qualityCertificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-600 hover:text-blue-500 text-sm"
                        >
                          View Certificate
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex flex-col items-end space-y-2">
                    {crop.blockchainHash && (
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-green-600 font-medium">Blockchain Registered</span>
                      </div>
                    )}
                    {showVerification && crop.blockchainHash && (
                      <button
                        onClick={() => verifyBlockchain(crop.id)}
                        disabled={loading}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                      >
                        {loading ? 'Verifying...' : 'Verify Blockchain'}
                      </button>
                    )}
                    {verificationStatus[crop.id] !== undefined && (
                      <div className={`text-xs font-medium ${verificationStatus[crop.id] ? 'text-green-600' : 'text-red-600'}`}>
                        {verificationStatus[crop.id] ? '✓ Verified' : '✗ Verification Failed'}
                      </div>
                    )}
                  </div>
                </div>
                {crop.blockchainTxHash && (
                  <div className="mt-3 text-xs text-gray-500">
                    <span className="font-medium">Transaction Hash:</span>
                    <span className="ml-1 font-mono break-all">{crop.blockchainTxHash}</span>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CropList;
