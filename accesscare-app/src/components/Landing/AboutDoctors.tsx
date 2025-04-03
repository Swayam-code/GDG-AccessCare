"use client";

import React from 'react';
import Image from 'next/image';

type DoctorCardProps = {
  name: string;
  specialty: string;
  imageSrc: string;
};

const DoctorCard = ({ name, specialty, imageSrc }: DoctorCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative h-80 w-full">
        <Image 
          src={imageSrc} 
          alt={`Dr. ${name}`} 
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
          <button className="bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-medium">
            View Profile
          </button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-blue-600 font-medium">{specialty}</p>
        <div className="mt-3 flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-500 text-sm ml-2">(25+ reviews)</span>
        </div>
      </div>
    </div>
  );
};

export const AboutDoctors = () => {
  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "General Medicine",
      imageSrc: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", 
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Pediatrics",
      imageSrc: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", 
    },
    {
      name: "Dr. Priya Patel",
      specialty: "Telemedicine Specialist",
      imageSrc: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80", 
    },
  ];

  return (
    <section id="doctors" className="py-24 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 w-64 h-64 bg-blue-100 rounded-full opacity-50 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-indigo-100 rounded-full opacity-50 translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="bg-blue-100 text-blue-800 rounded-full px-4 py-1 text-sm font-semibold tracking-wide uppercase mb-4 inline-block">Our Team</span>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl mb-6">
            Expert <span className="text-blue-600">Medical Professionals</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Our network of certified healthcare professionals is dedicated to bringing quality care to rural communities worldwide.
          </p>
        </div>

        <div className="mb-20">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-500 to-indigo-600 p-10 rounded-2xl shadow-xl text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-20">
              <svg width="180" height="180" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 20v-5h2v8H4v-8h2v5h7Zm-.368-7.332 1.774-1.774A8.93 8.93 0 0 0 19 4c0-.613-.061-1.212-.175-1.795l-2.679 2.679-2.879-2.879 2.679-2.679A8.93 8.93 0 0 0 14.001 0a8.94 8.94 0 0 0-8.242 5.462C5.835 12.648 7.903 14 10.4 14c.775 0 1.503-.142 2.232-.332Z" fill="currentColor"/>
              </svg>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-20 h-20 bg-white text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Trusted Healthcare Providers</h3>
                <p className="text-blue-100 text-lg">
                  All our doctors undergo a rigorous verification process. They are selected for their expertise in rural healthcare, 
                  commitment to telehealth, and ability to provide compassionate care across cultural and socioeconomic barriers.
                </p>
                <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Licensed & Certified
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified Credentials
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Rural Healthcare Trained
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Telemedicine Experts
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <DoctorCard
              key={index}
              name={doctor.name}
              specialty={doctor.specialty}
              imageSrc={doctor.imageSrc}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="#join" 
            className="inline-flex items-center px-8 py-4 border border-blue-500 text-base font-medium rounded-full shadow-lg text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-1"
          >
            Join As a Doctor
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutDoctors; 