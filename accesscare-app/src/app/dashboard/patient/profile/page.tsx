"use client";

import React, { useState } from 'react';
import { 
  FaUser, 
  FaHeartbeat, 
  FaClipboardList, 
  FaCog, 
  FaEdit, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope,
  FaTint,
  FaWeight,
  FaRulerVertical
} from 'react-icons/fa';

// Mock patient data
const patientData = {
  name: "Emma Wilson",
  profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
  email: "emma.wilson@example.com",
  phone: "(555) 123-4567",
  dateOfBirth: "May 12, 1990",
  gender: "Female",
  address: "123 Main Street, Anytown, CA 12345",
  bloodType: "A+",
  height: "168 cm",
  weight: "65 kg",
  allergies: ["Penicillin", "Peanuts", "Dust mites"],
  chronicConditions: ["Asthma", "Allergic rhinitis"],
  medications: [
    { name: "Albuterol inhaler", dosage: "2 puffs", frequency: "As needed" },
    { name: "Cetirizine", dosage: "10mg", frequency: "Once daily" }
  ],
  emergencyContact: {
    name: "John Wilson",
    relationship: "Husband",
    phone: "(555) 987-6543"
  },
  recentVisits: [
    { date: "March 15, 2025", doctor: "Dr. Sarah Johnson", reason: "Annual checkup" },
    { date: "January 10, 2025", doctor: "Dr. Michael Brown", reason: "Asthma follow-up" }
  ]
};

type TabType = 'personal' | 'medical' | 'preferences';

export default function PatientProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [formData, setFormData] = useState({
    name: patientData.name,
    email: patientData.email,
    phone: patientData.phone,
    address: patientData.address
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: true,
    appointments: true,
    reminders: true,
    newsletters: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNotificationChange = (setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving profile data:", formData);
    // Here you would call an API to update the profile
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-black mb-6">My Profile</h1>
      
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-col md:flex-row items-center border border-gray-100">
        <div className="relative">
          <img 
            src={patientData.profileImage} 
            alt={patientData.name} 
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm"
          />
          <button className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white shadow-sm hover:bg-blue-700 transition">
            <FaEdit size={14} />
          </button>
        </div>
        <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
          <h2 className="text-xl font-bold text-black">{patientData.name}</h2>
          <div className="text-black mt-1 flex flex-col md:flex-row md:items-center">
            <span className="flex items-center justify-center md:justify-start">
              <FaCalendarAlt className="text-blue-600 mr-2" />
              {patientData.dateOfBirth} ({new Date().getFullYear() - new Date(patientData.dateOfBirth).getFullYear()} years)
            </span>
            <span className="hidden md:inline mx-2 text-gray-400">•</span>
            <span className="flex items-center justify-center md:justify-start mt-1 md:mt-0">
              <FaTint className="text-blue-600 mr-2" />
              Blood Type: {patientData.bloodType}
            </span>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex items-center px-4 py-3 font-medium text-sm md:text-base ${
              activeTab === 'personal'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-black hover:text-blue-600'
            }`}
          >
            <FaUser className="mr-2" /> Personal Information
          </button>
          <button
            onClick={() => setActiveTab('medical')}
            className={`flex items-center px-4 py-3 font-medium text-sm md:text-base ${
              activeTab === 'medical'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-black hover:text-blue-600'
            }`}
          >
            <FaHeartbeat className="mr-2" /> Medical History
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`flex items-center px-4 py-3 font-medium text-sm md:text-base ${
              activeTab === 'preferences'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-black hover:text-blue-600'
            }`}
          >
            <FaCog className="mr-2" /> Settings
          </button>
        </div>
        
        <div className="p-6">
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-black mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-black mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  />
                </div>
              </div>
              
              {/* Contact Information Section */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-black mb-4">Emergency Contact</h3>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="mb-2 md:mb-0 md:mr-6">
                      <span className="text-sm text-black font-medium">Name:</span>
                      <span className="ml-2 text-black">{patientData.emergencyContact.name}</span>
                    </div>
                    <div className="mb-2 md:mb-0 md:mr-6">
                      <span className="text-sm text-black font-medium">Relationship:</span>
                      <span className="ml-2 text-black">{patientData.emergencyContact.relationship}</span>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="text-blue-600 mr-2" />
                      <span className="text-black">{patientData.emergencyContact.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
          
          {/* Medical History Tab */}
          {activeTab === 'medical' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start">
                  <div className="p-2 bg-red-100 rounded-full mr-3">
                    <FaTint className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-black mb-1">Blood Type</h3>
                    <p className="text-2xl font-bold text-black">{patientData.bloodType}</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start">
                  <div className="p-2 bg-blue-100 rounded-full mr-3">
                    <FaRulerVertical className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-black mb-1">Height</h3>
                    <p className="text-2xl font-bold text-black">{patientData.height}</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start">
                  <div className="p-2 bg-green-100 rounded-full mr-3">
                    <FaWeight className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-black mb-1">Weight</h3>
                    <p className="text-2xl font-bold text-black">{patientData.weight}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-black mb-3">Allergies</h3>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    {patientData.allergies.length > 0 ? (
                      <ul className="space-y-2">
                        {patientData.allergies.map((allergy, index) => (
                          <li key={index} className="flex items-center text-black">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            {allergy}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-black">No known allergies</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-black mb-3">Chronic Conditions</h3>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    {patientData.chronicConditions.length > 0 ? (
                      <ul className="space-y-2">
                        {patientData.chronicConditions.map((condition, index) => (
                          <li key={index} className="flex items-center text-black">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                            {condition}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-black">No chronic conditions</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-black mb-3">Current Medications</h3>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  {patientData.medications.length > 0 ? (
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Medication</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Dosage</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Frequency</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {patientData.medications.map((med, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-black">{med.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-black">{med.dosage}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-black">{med.frequency}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="p-4 text-black">No current medications</p>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-black mb-3">Recent Visits</h3>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  {patientData.recentVisits.length > 0 ? (
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                          <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Doctor</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Reason</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {patientData.recentVisits.map((visit, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-black">{visit.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-black">{visit.doctor}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-black">{visit.reason}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="p-4 text-black">No recent visits</p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Settings Tab */}
          {activeTab === 'preferences' && (
            <div>
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-black mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                    <div>
                      <h4 className="font-medium text-black">Email Notifications</h4>
                      <p className="text-sm text-black">Receive notifications via email</p>
                    </div>
                    <div className="relative inline-block w-12 align-middle select-none">
                      <input 
                        type="checkbox" 
                        id="email-toggle" 
                        className="sr-only"
                        checked={notificationSettings.email}
                        onChange={() => handleNotificationChange('email')}
                      />
                      <label 
                        htmlFor="email-toggle" 
                        className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                          notificationSettings.email ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span 
                          className={`block h-6 w-6 rounded-full bg-white transform transition-transform ${
                            notificationSettings.email ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                    <div>
                      <h4 className="font-medium text-black">SMS Notifications</h4>
                      <p className="text-sm text-black">Receive notifications via text message</p>
                    </div>
                    <div className="relative inline-block w-12 align-middle select-none">
                      <input 
                        type="checkbox" 
                        id="sms-toggle" 
                        className="sr-only"
                        checked={notificationSettings.sms}
                        onChange={() => handleNotificationChange('sms')}
                      />
                      <label 
                        htmlFor="sms-toggle" 
                        className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                          notificationSettings.sms ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span 
                          className={`block h-6 w-6 rounded-full bg-white transform transition-transform ${
                            notificationSettings.sms ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                    <div>
                      <h4 className="font-medium text-black">Appointment Reminders</h4>
                      <p className="text-sm text-black">Get reminders about upcoming appointments</p>
                    </div>
                    <div className="relative inline-block w-12 align-middle select-none">
                      <input 
                        type="checkbox" 
                        id="appointments-toggle" 
                        className="sr-only"
                        checked={notificationSettings.appointments}
                        onChange={() => handleNotificationChange('appointments')}
                      />
                      <label 
                        htmlFor="appointments-toggle" 
                        className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                          notificationSettings.appointments ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span 
                          className={`block h-6 w-6 rounded-full bg-white transform transition-transform ${
                            notificationSettings.appointments ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                    <div>
                      <h4 className="font-medium text-black">Medication Reminders</h4>
                      <p className="text-sm text-black">Get reminders to take your medication</p>
                    </div>
                    <div className="relative inline-block w-12 align-middle select-none">
                      <input 
                        type="checkbox" 
                        id="reminders-toggle" 
                        className="sr-only"
                        checked={notificationSettings.reminders}
                        onChange={() => handleNotificationChange('reminders')}
                      />
                      <label 
                        htmlFor="reminders-toggle" 
                        className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                          notificationSettings.reminders ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span 
                          className={`block h-6 w-6 rounded-full bg-white transform transition-transform ${
                            notificationSettings.reminders ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                    <div>
                      <h4 className="font-medium text-black">Health Tips & Newsletters</h4>
                      <p className="text-sm text-black">Receive health-related tips and updates</p>
                    </div>
                    <div className="relative inline-block w-12 align-middle select-none">
                      <input 
                        type="checkbox" 
                        id="newsletters-toggle" 
                        className="sr-only"
                        checked={notificationSettings.newsletters}
                        onChange={() => handleNotificationChange('newsletters')}
                      />
                      <label 
                        htmlFor="newsletters-toggle" 
                        className={`block h-6 overflow-hidden rounded-full cursor-pointer ${
                          notificationSettings.newsletters ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span 
                          className={`block h-6 w-6 rounded-full bg-white transform transition-transform ${
                            notificationSettings.newsletters ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-black mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                    <div className="flex items-center">
                      <FaUser className="text-blue-600 mr-3" />
                      <div>
                        <h4 className="font-medium text-black">Change Password</h4>
                        <p className="text-sm text-black">Update your account password</p>
                      </div>
                    </div>
                    <span className="text-blue-600">→</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                    <div className="flex items-center">
                      <FaClipboardList className="text-blue-600 mr-3" />
                      <div>
                        <h4 className="font-medium text-black">Privacy Preferences</h4>
                        <p className="text-sm text-black">Manage your data and privacy settings</p>
                      </div>
                    </div>
                    <span className="text-blue-600">→</span>
                  </button>
                  
                  <button className="w-full flex items-center justify-between bg-red-50 p-4 rounded-lg border border-red-100 hover:bg-red-100 transition">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      <div>
                        <h4 className="font-medium text-red-600">Delete Account</h4>
                        <p className="text-sm text-red-800">Permanently delete your account and data</p>
                      </div>
                    </div>
                    <span className="text-red-600">→</span>
                  </button>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 