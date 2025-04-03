"use client";

import React, { useState } from 'react';
import { 
  FaVideo, 
  FaUserCircle, 
  FaClock, 
  FaCalendar, 
  FaSearch,
  FaPhoneAlt,
  FaHistory,
  FaPlus
} from 'react-icons/fa';

// Mock upcoming calls data
const upcomingCalls = [
  {
    id: 1,
    patientName: 'John Smith',
    patientAge: 45,
    appointmentType: 'Follow-up',
    scheduledTime: '14:00',
    scheduledDate: 'Today',
    symptoms: 'Persistent cough, mild fever',
    profileImage: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    status: 'upcoming'
  },
  {
    id: 2,
    patientName: 'Robert Davis',
    patientAge: 58,
    appointmentType: 'Urgent Consultation',
    scheduledTime: '15:30',
    scheduledDate: 'Today',
    symptoms: 'Shortness of breath, chest pain',
    profileImage: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    status: 'upcoming'
  },
  {
    id: 3,
    patientName: 'Emma Johnson',
    patientAge: 32,
    appointmentType: 'Follow-up',
    scheduledTime: '10:15',
    scheduledDate: 'Tomorrow',
    symptoms: 'Joint pain, difficulty walking',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    status: 'upcoming'
  }
];

// Mock recent calls history
const callHistory = [
  {
    id: 101,
    patientName: 'Michael Brown',
    patientAge: 50,
    callDate: 'April 2, 2025',
    callTime: '11:30 AM',
    duration: '18 minutes',
    callType: 'Follow-up',
    notes: 'Discussed medication adjustment, patient reported improvement',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 102,
    patientName: 'Sarah Wilson',
    patientAge: 29,
    callDate: 'April 2, 2025',
    callTime: '09:15 AM',
    duration: '22 minutes',
    callType: 'Initial Consultation',
    notes: 'New patient intake, discussed symptoms and treatment plan',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  }
];

// Call Card component
const CallCard = ({ call }: { call: any }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <img 
            src={call.profileImage} 
            alt={call.patientName} 
            className="w-12 h-12 rounded-full object-cover shadow-sm"
          />
          <div className="ml-3">
            <h3 className="font-semibold text-black">{call.patientName}</h3>
            <p className="text-sm text-black">{call.patientAge} years • {call.appointmentType}</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {call.scheduledDate}
          </span>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex items-center mb-2">
          <FaClock className="text-blue-500 mr-2" />
          <span className="text-sm text-black">{call.scheduledTime}</span>
        </div>
        
        <p className="text-sm text-black">
          <span className="font-medium">Symptoms:</span> {call.symptoms}
        </p>
      </div>
      
      <div className="flex justify-end">
        <button className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition shadow-sm">
          <FaVideo className="mr-1.5" /> Start Call
        </button>
      </div>
    </div>
  );
};

// History Item component
const HistoryItem = ({ item }: { item: any }) => {
  return (
    <div className="flex items-center py-3 border-b border-gray-100">
      <img 
        src={item.profileImage} 
        alt={item.patientName} 
        className="w-10 h-10 rounded-full object-cover shadow-sm"
      />
      <div className="ml-3 flex-1">
        <div className="flex justify-between">
          <h3 className="font-medium text-black">{item.patientName}</h3>
          <span className="text-sm text-black">{item.duration}</span>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-black">{item.callType}</p>
          <p className="text-sm text-black">{item.callDate}, {item.callTime}</p>
        </div>
      </div>
    </div>
  );
};

export default function DoctorTeleconsultation() {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Video Consultations</h1>
        <div className="flex space-x-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search patients..."
              className="pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm flex items-center">
            <FaPlus className="mr-1.5" /> Schedule Call
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-3 px-1 font-medium text-sm ${
              activeTab === 'upcoming'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-black hover:text-blue-600'
            }`}
          >
            Upcoming Calls
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 px-1 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-black hover:text-blue-600'
            }`}
          >
            Call History
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'upcoming' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcomingCalls.map(call => (
              <CallCard key={call.id} call={call} />
            ))}
          </div>
          
          {upcomingCalls.length === 0 && (
            <div className="text-center py-10">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FaVideo className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-lg font-medium text-black mb-1">No Upcoming Calls</h3>
              <p className="text-black mb-4">You don't have any video calls scheduled.</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm">
                Schedule a Call
              </button>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'history' && (
        <div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="font-medium text-black">Recent Calls</h2>
            </div>
            <div className="p-4">
              {callHistory.map(item => (
                <HistoryItem key={item.id} item={item} />
              ))}
              
              {callHistory.length === 0 && (
                <div className="text-center py-8">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <FaHistory className="text-blue-600" />
                  </div>
                  <p className="text-sm text-black">No call history found</p>
                </div>
              )}
            </div>
            
            {callHistory.length > 0 && (
              <div className="px-4 py-3 border-t border-gray-100 text-center">
                <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                  View All History
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h3 className="font-medium text-black mb-3">Quick Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                    <FaVideo />
                  </div>
                  <div>
                    <p className="text-sm text-black">Total Calls</p>
                    <p className="text-lg font-bold text-black">128</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <p className="text-sm text-black">This Week</p>
                    <p className="text-lg font-bold text-black">8</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                    <FaCalendar />
                  </div>
                  <div>
                    <p className="text-sm text-black">Avg. Duration</p>
                    <p className="text-lg font-bold text-black">22 min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 