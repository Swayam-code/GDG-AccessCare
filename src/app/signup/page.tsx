"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';

type UserType = 'patient' | 'doctor' | '';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState<UserType>('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  // Error states
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [userTypeError, setUserTypeError] = useState('');
  const [termsError, setTermsError] = useState('');

  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
    return strength;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    // Reset errors
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setUserTypeError('');
    setTermsError('');

    // Validate full name
    if (!fullName.trim()) {
      setNameError('Full name is required');
      isValid = false;
    }

    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      isValid = false;
    } else if (checkPasswordStrength(password) < 3) {
      setPasswordError('Password is not strong enough');
      isValid = false;
    }

    // Validate confirm password
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    // Validate user type
    if (!userType) {
      setUserTypeError('Please select your user type');
      isValid = false;
    }

    // Validate terms agreement
    if (!agreeToTerms) {
      setTermsError('You must agree to the terms and conditions');
      isValid = false;
    }

    if (isValid) {
      // Handle signup logic here
      console.log('Signup attempt with:', { fullName, email, password, userType, agreeToTerms });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setUserType('patient')}
                  className={`relative p-4 border rounded-lg flex flex-col items-center focus:outline-none transition-all duration-200 ${
                    userType === 'patient'
                      ? 'border-green-500 bg-green-50 text-green-600'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`p-3 mb-1 rounded-full ${userType === 'patient' ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="font-medium text-lg">Patient</span>
                  {userType === 'patient' && (
                    <div className="absolute top-2 right-2 text-green-600">
                      <FaCheck className="w-4 h-4" />
                    </div>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('doctor')}
                  className={`relative p-4 border rounded-lg flex flex-col items-center focus:outline-none transition-all duration-200 ${
                    userType === 'doctor'
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`p-3 mb-1 rounded-full ${userType === 'doctor' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="font-medium text-lg">Doctor</span>
                  {userType === 'doctor' && (
                    <div className="absolute top-2 right-2 text-blue-600">
                      <FaCheck className="w-4 h-4" />
                    </div>
                  )}
                </button>
              </div>
              {userTypeError && <p className="mt-2 text-sm text-red-600">{userTypeError}</p>}
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-800 mb-1">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    nameError ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-900 bg-gray-50`}
                  placeholder=""
                />
                {nameError && <p className="mt-1 text-sm text-red-600">{nameError}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    emailError ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-900 bg-gray-50`}
                  placeholder=""
                />
                {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    passwordError ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-900 bg-gray-50`}
                  placeholder=""
                />
                {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
                
                {/* Password strength indicator */}
                <div className="mt-2 flex space-x-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div 
                      key={level}
                      className={`h-1.5 w-full rounded-full ${
                        passwordStrength >= level 
                          ? level <= 1 
                            ? 'bg-red-500' 
                            : level <= 2 
                              ? 'bg-orange-500' 
                              : level <= 3 
                                ? 'bg-yellow-500' 
                                : 'bg-green-500'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-1 text-xs text-gray-700">
                  {passwordStrength === 0 && "Enter a password"}
                  {passwordStrength === 1 && "Weak - Add uppercase, numbers or symbols"}
                  {passwordStrength === 2 && "Fair - Add more variety"}
                  {passwordStrength === 3 && "Good - Almost there"}
                  {passwordStrength === 4 && "Strong password"}
                </p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-800 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    confirmPasswordError ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-gray-900 bg-gray-50`}
                  placeholder=""
                />
                {confirmPasswordError && <p className="mt-1 text-sm text-red-600">{confirmPasswordError}</p>}
              </div>

              <div className="flex items-start pt-4">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-800">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                      Privacy Policy
                    </a>
                  </label>
                  {termsError && <p className="mt-1 text-sm text-red-600">{termsError}</p>}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
            >
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-gray-800">
            Already have an account?{' '}
            <Link 
              href="/login" 
              className="font-medium text-blue-600 hover:text-blue-800 transition duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-600 opacity-90 z-10"></div>
        <Image
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
          alt="Healthcare application"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          className="z-0"
          priority
        />
        <div className="relative z-20 flex flex-col justify-center items-center h-full text-white p-12">
          <div className="bg-blue-800 bg-opacity-30 backdrop-blur-sm p-10 rounded-2xl max-w-md">
            <h1 className="text-4xl font-bold mb-6">Join AccessCare</h1>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Easy Appointments</h3>
                <p>Schedule visits with top healthcare professionals in your area with just a few clicks.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Secure Health Records</h3>
                <p>Your medical history and data are securely stored and easily accessible when needed.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p>Get access to healthcare professionals and support whenever you need it.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 