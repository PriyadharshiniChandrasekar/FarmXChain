import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthGuard from './utils/AuthGuard';
import Shell from './components/layout/Shell';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FarmerProfile from './pages/FarmerProfile';
import CropManagement from './pages/CropManagement';
import UserManagement from './pages/UserManagement';
import FarmerVerification from './pages/FarmerVerification';
import AdminDashboard from './pages/AdminDashboard';
import FarmerList from './pages/FarmerList';
import Statistics from './pages/Statistics';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Router>
      <Shell>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          } />

          <Route path="/profile" element={
            <AuthGuard>
              <UserProfile />
            </AuthGuard>
          } />

          {/* Farmer Routes */}
          <Route path="/farmer-profile" element={
            <AuthGuard requiredRole="FARMER">
              <FarmerProfile />
            </AuthGuard>
          } />
          <Route path="/crop-management" element={
            <AuthGuard requiredRole="FARMER">
              <CropManagement />
            </AuthGuard>
          } />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={
            <AuthGuard requiredRole="ADMIN">
              <AdminDashboard />
            </AuthGuard>
          } />
          <Route path="/user-management" element={
            <AuthGuard requiredRole="ADMIN">
              <UserManagement />
            </AuthGuard>
          } />
          <Route path="/farmer-verification" element={
            <AuthGuard requiredRole="ADMIN">
              <FarmerVerification />
            </AuthGuard>
          } />
          <Route path="/statistics" element={
            <AuthGuard requiredRole="ADMIN">
              <Statistics />
            </AuthGuard>
          } />

          {/* Shared Routes */}
          <Route path="/farmer-list" element={
            <AuthGuard>
              <FarmerList />
            </AuthGuard>
          } />

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Shell>
    </Router>
  );
}

export default App;
