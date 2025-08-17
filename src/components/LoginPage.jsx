import React, { useState } from 'react';
import { Briefcase } from 'lucide-react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (isLogin) {
      // Handle login logic here
      console.log('Login attempt:', { email, password });
    } else {
      // Handle register logic here
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      console.log('Register attempt:', { name, email, password });
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Clear form when switching modes
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-8 cursor-pointer">
        <Briefcase className="h-8 w-8 text-blue-600" />
        <span className="text-2xl font-bold text-gray-900">
          ResumeFlow
        </span>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-sm">
        {/* Header */}
        <div className="p-6 pb-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            {isLogin ? 'Login' : 'Create Account'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {isLogin 
              ? 'Enter your email below to login to your account.'
              : 'Enter your information to create a new account.'
            }
          </p>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Social Login Buttons */}
         
          {/* Divider */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>

          {/* Sign up link */}
          <div className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/auth/register" className="text-blue-600 hover:text-blue-700 underline">
              Sign up
            </a>
          </div>
        </div>
      </div>

      {/* Toggle button for login/register */}
      <button
        type="button"
        onClick={toggleMode}
        className="mt-4 text-blue-600 hover:text-blue-800"
      >
        {isLogin ? "Need an account? Register" : "Already have an account? Login"}
      </button>
    </div>
  );
}