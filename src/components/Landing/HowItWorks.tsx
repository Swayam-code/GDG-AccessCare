"use client";

import React from 'react';
import Image from 'next/image';

type StepProps = {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const Step = ({ number, title, description, icon }: StepProps) => {
  return (
    <div className="relative">
      {/* Connector line */}
      <div className="hidden md:block absolute top-0 left-6 h-full w-0.5 bg-gradient-to-b from-blue-400 to-blue-600 -z-10 opacity-30"></div>
      
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md z-10">
          {number}
        </div>
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 text-blue-600">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          </div>
          <p className="text-gray-600 pl-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

export const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Register and fill your basic health info",
      description: "Create an account and provide basic health information to help us personalize your healthcare experience and ensure appropriate care.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
    },
    {
      number: 2,
      title: "Use AI for symptom check or schedule a consultation",
      description: "Describe your symptoms to our AI system or book a direct consultation with a healthcare professional based on your needs and connectivity.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      ),
    },
    {
      number: 3,
      title: "Get diagnosis and treatment plan",
      description: "Receive a detailed diagnosis and personalized treatment plan from healthcare professionals or AI recommendations backed by medical expertise.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
        </svg>
      ),
    },
    {
      number: 4,
      title: "Follow up and access reports anytime",
      description: "Schedule follow-up appointments and access your medical records, prescriptions, and reports from anywhere, ensuring continuity of care.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-white to-blue-50 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
      
      {/* Floating Elements */}
      <div className="absolute right-1/4 top-20 w-20 h-20 rounded-full bg-blue-100 opacity-40 animate-float"></div>
      <div className="absolute left-1/5 bottom-32 w-16 h-16 rounded-full bg-indigo-100 opacity-40 animate-float-delay"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <span className="bg-blue-100 text-blue-800 rounded-full px-4 py-1 text-sm font-semibold tracking-wide uppercase mb-4 inline-block">Process</span>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl mb-6">
            How <span className="text-blue-600">It Works</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Our simple process makes healthcare accessible to everyone, regardless of location or connectivity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
          {steps.map((step) => (
            <Step
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#features" 
            className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-1"
          >
            Explore Our Features
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 