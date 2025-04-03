"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-md' 
        : 'bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mr-3 flex items-center justify-center shadow-md transition-transform hover:scale-105">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">AccessCare</span>
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8 items-center">
              {['features', 'how-it-works', 'doctors', 'testimonials', 'faq', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="group relative font-medium text-gray-600 hover:text-blue-600 px-1 py-2 transition-colors duration-200"
                >
                  <span className="capitalize">{item.replace(/-/g, ' ')}</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </a>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="inline-flex items-center px-6 py-2 border-2 border-blue-500 text-sm font-semibold rounded-full text-blue-600 bg-transparent hover:bg-blue-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-semibold rounded-full shadow-md text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign Up
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, toggle classes based on menu state. */}
      <div className={`sm:hidden shadow-lg ${isOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1 px-4 bg-white">
          {['features', 'how-it-works', 'doctors', 'testimonials', 'faq', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="block pl-3 pr-4 py-3 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <span className="capitalize">{item.replace(/-/g, ' ')}</span>
            </a>
          ))}
        </div>
        <div className="pt-4 pb-6 bg-gray-50 px-6 space-y-4">
          <Link
            href="/login"
            className="block text-center w-full px-4 py-3 border-2 border-blue-500 text-base font-medium rounded-full text-blue-600 bg-white hover:bg-blue-50 transition-colors duration-200 shadow-sm"
            onClick={() => setIsOpen(false)}
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="block text-center w-full px-4 py-3 border border-transparent text-base font-medium rounded-full shadow-md text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 