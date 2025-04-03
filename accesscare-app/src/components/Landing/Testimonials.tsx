"use client";

import React from 'react';
import Image from 'next/image';

type TestimonialProps = {
  quote: string;
  name: string;
  location: string;
  imageSrc: string;
};

const TestimonialCard = ({ quote, name, location, imageSrc }: TestimonialProps) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative">
      <div className="absolute top-0 right-0 -mt-3 -mr-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-md z-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="flex items-start mb-6">
        <svg className="h-10 w-10 text-blue-500 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="text-gray-700 italic leading-relaxed">{quote}</p>
      </div>
      <div className="flex items-center border-t border-gray-100 pt-4">
        <div className="relative w-14 h-14 rounded-full mr-4 overflow-hidden">
          <Image 
            src={imageSrc} 
            alt={name} 
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 text-lg">{name}</h4>
          <p className="text-blue-600 text-sm">{location}</p>
        </div>
      </div>
    </div>
  );
};

export const Testimonials = () => {
  const testimonials = [
    {
      quote: "AccessCare helped my mother receive treatment when we couldn't travel to the city. The doctor provided clear guidance and the medicine was delivered to our village the next day. This service has been life-changing for our family.",
      name: "Raj Kumar",
      location: "Chittorgarh, Rajasthan",
      imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    },
    {
      quote: "When my son had a high fever, I used the symptom checker app without internet by SMS. It advised cooling techniques and when to seek emergency care. The follow-up with a doctor gave us peace of mind. This service is a lifeline for our community.",
      name: "Amina Ibrahim",
      location: "Mpala Village, Kenya",
      imageSrc: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80", 
    },
    {
      quote: "I'm a farmer with limited time to visit doctors. Being able to consult healthcare providers through my phone in my local language has changed how I manage my chronic condition. The education materials have helped my entire village improve our health.",
      name: "Manuel Gonzalez",
      location: "San Juan, Guatemala",
      imageSrc: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80",
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="bg-blue-100 text-blue-800 rounded-full px-4 py-1 text-sm font-semibold tracking-wide uppercase mb-4 inline-block">Testimonials</span>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl mb-6">
            Real Stories from <span className="text-blue-600">Rural Communities</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from people whose lives have been impacted by accessible healthcare through AccessCare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              location={testimonial.location}
              imageSrc={testimonial.imageSrc}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-6 py-3 rounded-full text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>These stories represent real use cases but names and photos have been changed for privacy.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 