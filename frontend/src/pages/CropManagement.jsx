import React, { useState, useEffect } from 'react';
import CropService from '../services/CropService';
import CropList from '../components/CropList';

const CropManagement = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    cropName: '',
    quantityKg: '',
    harvestDate: '',
    qualityCertificateUrl: '',
    originLocation: '',
    qualityData: ''
  });

  useEffect(() => {
    loadCrops();
  }, []);

  const loadCrops = async () => {
    try {
      setLoading(true);
      const response = await CropService.getMyCrops();
      setCrops(response.data || []);
    } catch (err) {
      setError('Failed to load crops');
      console.error('Error loading crops:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const cropData = {
        ...formData,
        quantityKg: parseFloat(formData.quantityKg)
      };

      await CropService.addCrop(cropData);
      setSuccess('Crop added successfully and registered on blockchain!');
      setFormData({
        cropName: '',
        quantityKg: '',
        harvestDate: '',
        qualityCertificateUrl: '',
        originLocation: '',
        qualityData: ''
      });
      setShowAddForm(false);
      loadCrops(); // Refresh the list
    } catch (err) {
      setError(err.message || 'Failed to add crop');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      cropName: '',
      quantityKg: '',
      harvestDate: '',
      qualityCertificateUrl: '',
      originLocation: '',
      qualityData: ''
    });
    setShowAddForm(false);
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Crop Management</h1>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Add New Crop
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              {success}
            </div>
          )}

          {showAddForm && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Crop</h3>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cropName" className="block text-sm font-medium text-gray-700">
                        Crop Name *
                      </label>
                      <input
                        type="text"
                        name="cropName"
                        id="cropName"
                        required
                        className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2 border"
                        value={formData.cropName}
                        onChange={handleInputChange}
                        placeholder="e.g., Wheat, Rice, Corn"
                      />
                    </div>

                    <div>
                      <label htmlFor="quantityKg" className="block text-sm font-medium text-gray-700">
                        Quantity (kg) *
                      </label>
                      <input
                        type="number"
                        name="quantityKg"
                        id="quantityKg"
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2 border"
                        value={formData.quantityKg}
                        onChange={handleInputChange}
                        placeholder="e.g., 1000.50"
                      />
                    </div>

                    <div>
                      <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700">
                        Harvest Date *
                      </label>
                      <input
                        type="datetime-local"
                        name="harvestDate"
                        id="harvestDate"
                        required
                        className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2 border"
                        value={formData.harvestDate}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="originLocation" className="block text-sm font-medium text-gray-700">
                        Origin Location
                      </label>
                      <input
                        type="text"
                        name="originLocation"
                        id="originLocation"
                        className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2 border"
                        value={formData.originLocation}
                        onChange={handleInputChange}
                        placeholder="e.g., Punjab, India"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="qualityCertificateUrl" className="block text-sm font-medium text-gray-700">
                        Quality Certificate URL
                      </label>
                      <input
                        type="url"
                        name="qualityCertificateUrl"
                        id="qualityCertificateUrl"
                        className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2 border"
                        value={formData.qualityCertificateUrl}
                        onChange={handleInputChange}
                        placeholder="https://example.com/certificate.pdf"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="qualityData" className="block text-sm font-medium text-gray-700">
                        Quality Data
                      </label>
                      <textarea
                        name="qualityData"
                        id="qualityData"
                        rows={3}
                        className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2 border"
                        value={formData.qualityData}
                        onChange={handleInputChange}
                        placeholder="Additional quality information, certifications, etc."
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                    >
                      {loading ? 'Adding Crop...' : 'Add Crop & Register on Blockchain'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Crops</h2>
            <p className="mt-1 text-sm text-gray-600">
              View and manage your crop listings with blockchain traceability
            </p>
          </div>

          {loading && !showAddForm ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-green-500 mx-auto"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading crops...</p>
            </div>
          ) : (
            <CropList crops={crops} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CropManagement;
