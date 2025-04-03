"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute right-0 bottom-0 -mb-10 -mr-10 w-80 h-80 rounded-full bg-blue-400 filter blur-3xl opacity-30"></div>
        <div className="absolute left-0 top-0 -mt-10 -ml-10 w-80 h-80 rounded-full bg-purple-400 filter blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-12 lg:mb-0 z-10">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-blue-900 leading-tight mb-6">
            Bringing Healthcare to <span className="text-blue-600">Every Village</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg">
            AccessCare bridges the gap between remote villages and quality healthcare using AI and telemedicine technology, ensuring healthcare access for all.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/login" 
              className="px-8 py-4 bg-blue-600 text-white font-medium rounded-full shadow-lg hover:bg-blue-700 transition-colors transform hover:-translate-y-1 hover:shadow-xl duration-300"
            >
              Get Started
            </Link>
            <a 
              href="#how-it-works" 
              className="px-8 py-4 bg-white text-blue-600 font-medium rounded-full shadow-lg border border-blue-200 hover:bg-blue-50 transition-colors transform hover:-translate-y-1 hover:shadow-xl duration-300"
            >
              How It Works
            </a>
          </div>
        </div>
        <div className="lg:w-1/2 relative z-10">
          <div className="relative w-full h-[400px] lg:h-[500px]">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 rounded-3xl transform rotate-3 shadow-xl"></div>
            <div className="absolute inset-0 transform -rotate-3">
              <Image
                src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80"
                alt="Healthcare in remote villages"
                fill
                className="object-cover rounded-3xl p-2"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements for Visual Interest */}
      <div className="absolute left-10 top-32 w-16 h-16 bg-blue-200 rounded-full opacity-50 animate-float"></div>
      <div className="absolute right-16 bottom-20 w-12 h-12 bg-purple-200 rounded-full opacity-50 animate-float-delay"></div>
      <div className="absolute left-1/4 bottom-10 w-8 h-8 bg-indigo-200 rounded-full opacity-50 animate-float-slow"></div>
    </section>
  );
};

export default HeroSection; 