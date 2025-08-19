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
      className="w-full px-3 py-2 border border-gray-300 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors rounded-md"
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
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async () => {
    setMessage(''); 
    setMessageType('');

    if (!formData.email || !formData.password) {
      setMessage('Please enter both email and password.');
      setMessageType('error');
      return;
    }

    if (isLogin) {
      try {
        const response = await fetch(`${API_URL}/login`, {
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
            setMessage(errorData.message || 'Login failed. Please check your credentials.');
          } else {
            const errorText = await response.text();
            setMessage(errorText || 'Login failed due to an unknown error.');
          }
          setMessageType('error');
        } else {
          
          const data = await response.json(); 
          const token = data.token; 
          if (token) {
            localStorage.setItem('Token', token); // Store the token
            setMessage('Login successful! Welcome back.');
            setMessageType('success');
            console.log('Login successful, token received:', token);
            navigate('/build'); // Redirect to /build on successful login
          } else {
            setMessage('Login successful, but no token received.');
            setMessageType('error'); 
          }
        }
      } catch (error) {
        console.error('Login error:', error);
        setMessage('Failed to connect to the server. Please try again later.');
        setMessageType('error');
      }
    } 
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
  };

  const messageClass = messageType === 'error' ? 'text-red-600' : 'text-green-600';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-['Inter']">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-8 cursor-pointer">
        <Briefcase className="h-8 w-8 text-blue-600" />
        <span className="text-2xl font-bold text-gray-900">ResumeFlow</span>
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

            {/* Display message here */}
            {message && (
              <p className={`text-sm font-medium ${messageClass}`}>{message}</p>
            )}

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLogin ? 'Sign in' : 'Create Account'}
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
