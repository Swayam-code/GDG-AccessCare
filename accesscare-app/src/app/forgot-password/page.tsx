"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    // Reset errors
    setEmailError('');

    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    if (isValid) {
      // Handle password reset logic here
      console.log('Password reset requested for:', email);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 md:p-12 bg-white">
        <div className="w-full max-w-md">
          <Link 
            href="/login" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition duration-200 font-medium"
          >
            <FaArrowLeft className="mr-2" />
            <span>Back to login</span>
          </Link>

          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Forgot Your Password?</h2>
          </div>

          {!isSubmitted ? (
            <div className="mb-6">
              <p className="text-gray-800 mb-6">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
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

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                >
                  Send Reset Link
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-8 px-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Check Your Email</h3>
              <p className="text-gray-800 mb-6">
                We've sent a password reset link to <span className="font-medium">{email}</span>. 
                Please check your inbox and follow the instructions.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Didn't receive an email? Try again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900 opacity-90 z-10"></div>
        <Image
          src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
          alt="Healthcare support"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          className="z-0"
          priority
        />
        <div className="relative z-20 flex flex-col justify-center items-center h-full text-white p-12">
          <div className="bg-blue-900/30 backdrop-blur-sm p-10 rounded-2xl max-w-md text-center">
            <h1 className="text-4xl font-bold mb-6">We've Got You Covered</h1>
            <p className="text-xl mb-8">
              Accessing your healthcare information should never be difficult. 
              We're here to make sure you can always connect to the care you need.
            </p>
            <div className="p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <p className="text-white/90 text-lg italic">
                "AccessCare has simplified my entire healthcare experience. I can manage appointments, 
                review test results, and connect with doctors all in one place."
              </p>
              <div className="mt-6 flex items-center justify-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-xl font-bold">SJ</span>
                </div>
                <div className="text-left">
                  <p className="font-medium text-lg">Sarah Johnson</p>
                  <p className="text-white/80">Patient</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 