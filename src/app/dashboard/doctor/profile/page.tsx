"use client";

import React, { useState } from 'react';
import {
  FaUser,
  FaBuilding,
  FaGraduationCap,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSave,
  FaCamera,
  FaLock,
  FaIdCard,
  FaCertificate
} from 'react-icons/fa';

// Mock doctor data
const doctorData = {
  name: 'Dr. Sarah Johnson',
  profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80',
  specialty: 'Cardiologist',
  experience: '12 years',
  email: 'sarah.johnson@accesscare.com',
  phone: '(555) 123-4567',
  address: '123 Medical Center Blvd, Suite 456, New York, NY 10001',
  education: [
    { degree: 'MD', institution: 'Harvard Medical School', year: '2008' },
    { degree: 'Residency in Internal Medicine', institution: 'Massachusetts General Hospital', year: '2011' },
    { degree: 'Fellowship in Cardiology', institution: 'Johns Hopkins Hospital', year: '2014' }
  ],
  certifications: [
    { name: 'Board Certified in Cardiology', year: '2014' },
    { name: 'Advanced Cardiac Life Support (ACLS)', year: '2022' }
  ],
  workHours: {
    monday: '9:00 AM - 5:00 PM',
    tuesday: '9:00 AM - 5:00 PM',
    wednesday: '9:00 AM - 5:00 PM',
    thursday: '10:00 AM - 6:00 PM',
    friday: '8:00 AM - 4:00 PM',
    saturday: 'Closed',
    sunday: 'Closed'
  }
};

export default function DoctorProfilePage() {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    name: doctorData.name,
    email: doctorData.email,
    phone: doctorData.phone,
    address: doctorData.address,
    specialty: doctorData.specialty,
    experience: doctorData.experience
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the profile update logic
    console.log('Updated profile data:', formData);
    alert('Profile updated successfully!');
  };

  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-2xl font-bold text-black">Doctor Profile</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="relative">
              <img
                src={doctorData.profileImage}
                alt={doctorData.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
              <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full text-blue-600 shadow-md">
                <FaCamera size={16} />
              </button>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <h2 className="text-xl font-bold text-white">{doctorData.name}</h2>
              <p className="text-blue-100">{doctorData.specialty} • {doctorData.experience}</p>
            </div>
          </div>
          <button className="mt-4 md:mt-0 px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition shadow-sm">
            Preview Public Profile
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'personal'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-black hover:text-blue-600'
            }`}
          >
            Personal Information
          </button>
          <button
            onClick={() => setActiveTab('professional')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'professional'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-black hover:text-blue-600'
            }`}
          >
            Professional Details
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'schedule'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-black hover:text-blue-600'
            }`}
          >
            Schedule & Availability
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'account'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-black hover:text-blue-600'
            }`}
          >
            Account Settings
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Specialty
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaIdCard className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleInputChange}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-black mb-1">
                    Office Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Years of Experience
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md flex items-center"
                >
                  <FaSave className="mr-2" /> Save Changes
                </button>
              </div>
            </form>
          )}
          
          {/* Professional Details Tab */}
          {activeTab === 'professional' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-black mb-4">Education</h3>
                <div className="space-y-4">
                  {doctorData.education.map((item, index) => (
                    <div key={index} className="flex p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        <FaGraduationCap className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-black">{item.degree}</h4>
                        <p className="text-sm text-black">{item.institution} • {item.year}</p>
                      </div>
                    </div>
                  ))}
                  <button className="text-blue-600 font-medium hover:text-blue-800">
                    + Add Education
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-black mb-4">Certifications</h3>
                <div className="space-y-4">
                  {doctorData.certifications.map((item, index) => (
                    <div key={index} className="flex p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="p-2 bg-green-100 rounded-lg mr-3">
                        <FaCertificate className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-black">{item.name}</h4>
                        <p className="text-sm text-black">Issued: {item.year}</p>
                      </div>
                    </div>
                  ))}
                  <button className="text-blue-600 font-medium hover:text-blue-800">
                    + Add Certification
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-black mb-4">Hospital Affiliations</h3>
                <div className="space-y-4">
                  <div className="flex p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="p-2 bg-purple-100 rounded-lg mr-3">
                      <FaBuilding className="text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-black">Metropolitan General Hospital</h4>
                      <p className="text-sm text-black">Attending Physician • 2014 - Present</p>
                    </div>
                  </div>
                  <button className="text-blue-600 font-medium hover:text-blue-800">
                    + Add Affiliation
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div>
              <h3 className="text-lg font-medium text-black mb-4">Working Hours</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(doctorData.workHours).map(([day, hours], index) => (
                  <div key={index} className="flex p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <FaClock className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-black capitalize">{day}</h4>
                        <button className="text-blue-600 text-sm hover:text-blue-800">Edit</button>
                      </div>
                      <p className="text-sm text-black">{hours}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-black mb-4">Appointment Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <h4 className="font-medium text-black">Appointment Duration</h4>
                      <p className="text-sm text-black">Default time slot for appointments</p>
                    </div>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
                      <option value="15">15 minutes</option>
                      <option value="30" selected>30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <h4 className="font-medium text-black">Buffer Time</h4>
                      <p className="text-sm text-black">Time between appointments</p>
                    </div>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black">
                      <option value="0">0 minutes</option>
                      <option value="5">5 minutes</option>
                      <option value="10" selected>10 minutes</option>
                      <option value="15">15 minutes</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Account Settings Tab */}
          {activeTab === 'account' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-black mb-4">Security</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="font-medium text-black">Password</h4>
                        <p className="text-sm text-black">Last updated 3 months ago</p>
                      </div>
                      <button className="flex items-center px-3 py-1.5 bg-white border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition shadow-sm">
                        <FaLock className="mr-1.5" /> Change Password
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-black">Two-Factor Authentication</h4>
                        <p className="text-sm text-black">Add an extra layer of security</p>
                      </div>
                      <button className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-black mb-4">Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <h4 className="font-medium text-black">Email Notifications</h4>
                      <p className="text-sm text-black">Receive appointment and patient updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <h4 className="font-medium text-black">SMS Notifications</h4>
                      <p className="text-sm text-black">Receive text messages for urgent updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-black mb-4">Account Actions</h3>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition">
                    Download My Data
                  </button>
                  <button className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition">
                    Deactivate Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 