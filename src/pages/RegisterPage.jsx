import React, { useState } from 'react';
import { Briefcase } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:2222/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name: fullName }),
      });

      const data = await response.text();

      if (response.ok) {
        setSuccessMessage('Registration successful! You can now sign in.');
        console.log('Registration successful:', data);
        setEmail('');
        setPassword('');
        setFullName('');
        setConfirmPassword('');
      } else {
        setErrorMessage(data.message || 'Registration failed. Please try again.');
        console.log('Registration failed:', data);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
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
          <form onSubmit={handleSubmit} className="space-y-4">
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
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          {/* Sign in link */}
          <div className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/auth/login" className="text-blue-600 hover:text-blue-700 underline">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}