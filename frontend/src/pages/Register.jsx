import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import Logo from '../components/Logo';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'FARMER'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await AuthService.register(formData);
      if (response.success) {
        setSuccess('Registration successful! Redirecting...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-neutral-50">
      {/* Left Side - Hero/Image - Mirrored for Register */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-secondary-950 order-last">
        <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
        {/* Maximum Contrast Overlay: Solid dark curtain with slight transparency */}
        <div className="absolute inset-0 bg-secondary-950/90"></div>
        <div className="relative z-10 flex flex-col justify-between p-12 text-white h-full text-left">
          <Logo className="text-white mr-auto text-white" size="large" />
          <div className="mt-auto mb-20">
            <h1 className="text-5xl font-display font-bold mb-6 leading-tight drop-shadow-md text-white">
              Join the Future of <br />
              <span className="text-white">
                Agriculture.
              </span>
            </h1>
            <p className="text-xl text-neutral-100 max-w-lg mr-auto leading-relaxed font-light drop-shadow-sm">
              Connect with a global network of verified farmers, distributors, and consumers. Your journey to transparent farming starts here.
            </p>
          </div>
          <div className="flex gap-4 text-sm font-medium text-white/90 justify-start">
            <span className="hover:text-white cursor-pointer transition-colors underline decoration-white/30 underline-offset-4">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors underline decoration-white/30 underline-offset-4">Support</span>
          </div>
        </div>
      </div>

      {/* Right Side (visually left) - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Logo />
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-neutral-900">Create Account</h2>
            <p className="mt-2 text-sm text-neutral-500">
              Join the FarmXChain ecosystem today.
            </p>
          </div>

          <div className="animate-slide-up space-y-5">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium animate-shake">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-primary-50 border border-primary-100 text-primary-700 px-4 py-3 rounded-xl text-sm font-medium animate-pulse">
                  {success}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="col-span-2"
                />
              </div>

              <Input
                label="Email Address"
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
              />

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-neutral-700 mb-1">
                  I am a...
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  className="block w-full rounded-xl border-neutral-200 bg-neutral-50 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm py-3 transition-colors"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="FARMER">Farmer</option>
                  <option value="DISTRIBUTOR">Distributor</option>
                  <option value="RETAILER">Retailer</option>
                  <option value="CONSUMER">Consumer</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Min 8 chars"
                  value={formData.password}
                  onChange={handleChange}
                />

                <Input
                  label="Confirm Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="Confirm"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full justify-center py-3.5 text-base shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-200/50 transition-all transform hover:-translate-y-0.5"
                >
                  {loading ? 'Creating Account...' : 'Get Started'}
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-neutral-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
