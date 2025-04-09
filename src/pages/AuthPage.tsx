import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Bell, Link } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function AuthPage() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear errors when user types
    if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
      setPasswordError('');
    }
    if (e.target.name === 'email' || e.target.name === 'password') {
      setLoginError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (isLogin) {
      const success = await login(formData.email, formData.password);
      if (!success) {
        setLoginError('Invalid credentials');
        return;
      }
    } else {
      signup(formData.name, formData.email, formData.phone, formData.password);
    }
    navigate('/pricing');
  };

  return (
    <div className="min-h-screen bg-purple-20 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-2xl">
        {/* Left Side - Company Icon */}
        <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 p-12 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-2">Linkz.</h1>
            <p className="text-xl text-purple-100">Your one-stop loyalty solution</p>
          </div>

          {/* Company Icon */}
          <div className="relative z-10 flex justify-center items-center flex-1">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 bg-white/10 rounded-full backdrop-blur-sm"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Link className="w-48 h-48 text-white/90" strokeWidth={1} />
              </div>
              {/* Decorative rings */}
              <div className="absolute inset-0 border-4 border-white/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-4 border-2 border-white/30 rounded-full animate-pulse delay-75"></div>
              <div className="absolute inset-8 border border-white/40 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-purple-200">Analytics Dashboard</p>
                <p className="font-semibold">Track your growth</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <Bell className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-purple-200">Smart Notifications</p>
                <p className="font-semibold">Stay updated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-12">
          <div className="max-w-md mx-auto">
            <h2 className="text-4xl font-bold mb-2 text-gray-900">{isLogin ? 'Welcome Back' : 'Get Started'}</h2>
            <p className="text-gray-600 mb-8">
              {isLogin ? "Let's get you back in" : 'Create your account to get started'}
              {' '}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-600 font-semibold hover:text-purple-700"
              >
                {isLogin ? 'Need an account?' : 'Already have an account?'}
              </button>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-600 focus:border-transparent ${
                      passwordError ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Confirm your password"
                  />
                  {passwordError && (
                    <p className="mt-1 text-sm text-red-600">{passwordError}</p>
                  )}
                </div>
              )}

              {isLogin && loginError && (
                <div>
                  <p className="mt-1 text-sm text-red-600">{loginError}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {isLogin ? 'Log In' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;