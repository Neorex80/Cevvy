import React, { useState } from 'react';
import { Briefcase } from 'lucide-react';

import { API_URL } from '../config';

function InputField({ id, label, type, value, onChange, required, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  );
}

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showAdLoader, setShowAdLoader] = useState(false); // New state for ad loader
  const [isLoading, setIsLoading] = useState(false); // To disable button during submission/ad loading

  const performRegistrationAction = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name: fullName }),
      });

      // Attempt to parse JSON first, then fall back to text if it's not JSON
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (response.ok) {
        setSuccessMessage('Registration successful! You can now sign in.');
        console.log('Registration successful:', data);
        setEmail('');
        setPassword('');
        setFullName('');
        setConfirmPassword('');
      } else {
        // Use data.message if available, otherwise use the raw data or a generic message
        setErrorMessage(data.message || data || 'Registration failed. Please try again.');
        console.log('Registration failed:', data);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdLoadAndSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setErrorMessage('');
    setSuccessMessage('');
    setShowAdLoader(true); // Show ad loader
    setIsLoading(true); // Disable button while ad is loading

    // Simulate ad loading for 2 seconds
    setTimeout(() => {
      setShowAdLoader(false); // Hide ad loader
      performRegistrationAction(); // Proceed with registration after ad
    }, 2000); // 2-second delay
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-['Inter']">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-8 cursor-pointer">
        <Briefcase className="h-8 w-8 text-blue-600" />
        <span className="text-2xl font-bold text-gray-900">
          ResumeCraft
        </span>
      </div>

      {/* Registration Card */}
      <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-sm">
        {/* Header */}
        <div className="p-6 pb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Sign Up</h2>
          <p className="text-sm text-gray-600 mt-1">
            Create an account to start building your resume.
          </p>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">

          {/* Social Sign-in Divider (unchanged) */}
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

          {/* Registration Form */}
          <form onSubmit={handleAdLoadAndSubmit} className="space-y-4"> {/* Call new handler here */}
            {/* Display Messages */}
            {successMessage && (
              <div className="p-3 text-sm text-green-700 bg-green-100 rounded-md">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">
                {errorMessage}
              </div>
            )}

            {/* Ad Loader Display */}
            {showAdLoader && (
              <div className="flex items-center justify-center py-4 bg-gray-100 rounded-md">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                <p className="ml-3 text-sm font-medium text-gray-700">Loading Ad...</p>
              </div>
            )}

            <InputField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="m@example.com"
            />

            <InputField
              id="full-name"
              label="Full name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="John Doe"
            />
            <InputField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />

            <InputField
              id="confirm-password"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
            <button
              type="submit"
              disabled={isLoading} /* Disable button when submitting or ad loading */
              className={`w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              {isLoading ? 'Loading...' : 'Create Account'}
            </button>
          </form>

          {/* Sign in link */}
          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:text-blue-700 underline">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
