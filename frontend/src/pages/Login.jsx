import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import Logo from '../components/Logo';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await AuthService.login(credentials);
      if (response.success) {
        window.location.href = '/dashboard';
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-neutral-50">
      {/* Left Side - Hero/Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary-950">
        <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
        {/* Maximum Contrast Overlay: Solid dark curtain with slight transparency */}
        <div className="absolute inset-0 bg-primary-950/90"></div>
        <div className="relative z-10 flex flex-col justify-between p-12 text-white h-full">
          <Logo className="text-white" size="large" />
          <div className="mt-auto mb-20">
            <h1 className="text-5xl font-display font-bold mb-6 leading-tight drop-shadow-md text-white">
              Cultivating Trust through <br />
              <span className="text-white">
                Technology.
              </span>
            </h1>
            <p className="text-xl text-neutral-100 max-w-lg leading-relaxed font-light drop-shadow-sm">
              Empowering farmers, ensuring transparency, and building a sustainable future with blockchain-verified supply chains.
            </p>
          </div>
          <div className="flex gap-4 text-sm font-medium text-white/90">
            <span>© 2024 FarmXChain</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors underline decoration-white/30 underline-offset-4">Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="lg:hidden mb-8">
            <Logo />
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-neutral-900">Welcome back</h2>
            <p className="mt-2 text-sm text-neutral-500">
              Please sign in to your dashboard.
            </p>
          </div>

          <div className="animate-fade-in space-y-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-center animate-shake">
                  <svg className="w-5 h-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <Input
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@farmxchain.com"
                  value={credentials.email}
                  onChange={handleChange}
                  className="rounded-xl"
                />

                <Input
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={handleChange}
                  className="rounded-xl"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-600 cursor-pointer select-none">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full justify-center py-3.5 text-base shadow-primary-200 shadow-lg hover:shadow-xl hover:shadow-primary-200/50 transition-all transform hover:-translate-y-0.5"
                  variant="primary"
                >
                  {loading ? 'Authenticating...' : 'Sign in to Dashboard'}
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-neutral-500">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
