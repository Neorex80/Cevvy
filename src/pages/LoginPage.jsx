import React, { useState } from 'react';
import { Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const InputField = ({ id, label, type, value, onChange, required, placeholder }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
    />
  </div>
);

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState(''); // Unified state for success/error messages
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [showAdLoader, setShowAdLoader] = useState(false); // New state for ad loader
  const [isSubmitting, setIsSubmitting] = useState(false); // To disable button during submission/ad loading

  const navigate = useNavigate(); // Uncomment and initialize if using react-router-dom

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const performAuthAction = async () => {
    setMessage('');
    setMessageType('');
    setIsSubmitting(true); // Disable button

    if (!formData.email || !formData.password) {
      setMessage('Please enter both email and password.');
      setMessageType('error');
      setIsSubmitting(false); // Re-enable button
      return;
    }

    // Simulate API call
    try {
      const endpoint = isLogin ? `${API_URL}/login` : `${API_URL}/register`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          setMessage(errorData.message || `${isLogin ? 'Login' : 'Registration'} failed. Please check your credentials.`);
        } else {
          const errorText = await response.text();
          setMessage(errorText || `${isLogin ? 'Login' : 'Registration'} failed due to an unknown error.`);
        }
        setMessageType('error');
      } else {
        const data = await response.json();
        const token = data.token;
        if (token) {
          localStorage.setItem('Token', token); // Store the token
          setMessage(`${isLogin ? 'Login' : 'Registration'} successful!`);
          setMessageType('success');
          console.log(`${isLogin ? 'Login' : 'Registration'} successful, token received:`, token);
          navigate('/build'); 
        } else {
          setMessage(`${isLogin ? 'Login' : 'Registration'} successful, but no token received.`);
          setMessageType('error');
        }
      }
    } catch (error) {
      console.error(`${isLogin ? 'Login' : 'Registration'} error:`, error);
      setMessage('Failed to connect to the server. Please try again later.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false); // Re-enable button after API call
    }
  };

  const handleAdLoadAndSubmit = () => {
    setMessage('');
    setMessageType('');
    setShowAdLoader(true); // Show ad loader
    setIsSubmitting(true); // Disable button while ad is loading

    // Simulate ad loading for 2 seconds
    setTimeout(() => {
      setShowAdLoader(false); // Hide ad loader
      performAuthAction(); // Proceed with login/registration after ad
    }, 2000); // 2-second delay
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Clear form data and messages when switching modes
    setFormData({
      email: '',
      password: '',
    });
    setMessage('');
    setMessageType('');
    setShowAdLoader(false); // Hide ad loader if switching modes
    setIsSubmitting(false); // Ensure button is enabled
  };

  const messageClass = messageType === 'error' ? 'text-red-600' : 'text-green-600';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-['Inter']">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-8 cursor-pointer">
        <Briefcase className="h-8 w-8 text-blue-600" />
        <span className="text-2xl font-bold text-gray-900">Resume-Craft</span>
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
              : 'Enter your email and password to create a new account.'}
          </p>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
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

          {/* Login/Register Form */}
          <div className="space-y-4">
            <InputField
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="m@example.com"
            />
            <InputField
              id="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="••••••••"
            />

            {/* Ad Loader Display */}
            {showAdLoader && (
              <div className="flex items-center justify-center py-4 bg-gray-100 rounded-md">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                <p className="ml-3 text-sm font-medium text-gray-700">Sign in ...</p>
              </div>
            )}

            {/* Display message here */}
            {message && (
              <p className={`text-sm font-medium ${messageClass}`}>{message}</p>
            )}

            <button
              onClick={handleAdLoadAndSubmit} 
              disabled={isSubmitting} 
              className={`w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              {isSubmitting ? 'Loading...' : (isLogin ? 'Sign in' : 'Create Account')}
            </button>
          </div>

          {/* Toggle link for login/register */}
          <div className="mt-4 text-center text-sm text-gray-600">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
