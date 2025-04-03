"use client";

import React, { useState } from 'react';
import { 
  FaCalendarDay, 
  FaVideo, 
  FaUserInjured, 
  FaFileAlt, 
  FaBell, 
  FaPlus,
  FaEllipsisV,
  FaUserCircle,
  FaClock,
  FaChartLine
} from 'react-icons/fa';

// Mock appointment data
const todayAppointments = [
  {
    id: 1,
    patientName: 'John Smith',
    patientAge: 45,
    appointmentType: 'Follow-up',
    time: '09:00 AM',
    status: 'confirmed',
    isOnline: true,
    symptoms: 'Persistent cough, mild fever',
    profileImage: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 2,
    patientName: 'Emma Johnson',
    patientAge: 32,
    appointmentType: 'New Patient',
    time: '10:30 AM',
    status: 'confirmed',
    isOnline: false,
    symptoms: 'Joint pain, difficulty walking',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 3,
    patientName: 'Robert Davis',
    patientAge: 58,
    appointmentType: 'Consultation',
    time: '01:00 PM',
    status: 'pending',
    isOnline: true,
    symptoms: 'Shortness of breath, chest pain',
    profileImage: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
];

// Mock patient summary data
const patientSummary = {
  total: 128,
  new: 12,
  critical: 4,
  followUps: 24
};

// AppointmentCard component
const AppointmentCard = ({ appointment }: { appointment: any }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-black';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="relative">
              <img 
                src={appointment.profileImage} 
                alt={appointment.patientName} 
                className="w-12 h-12 rounded-full object-cover shadow-sm"
              />
              {appointment.isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-black">{appointment.patientName}</h3>
              <p className="text-sm text-black">
                {appointment.patientAge} years • {appointment.appointmentType}
              </p>
            </div>
          </div>
          <div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-3">
          <FaClock className="text-blue-500 mr-2" />
          <span className="text-sm text-black">{appointment.time}</span>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-black">
            <span className="font-medium">Symptoms:</span> {appointment.symptoms}
          </p>
        </div>
        
        <div className="flex justify-end">
          {appointment.isOnline && (
            <button className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition shadow-sm">
              <FaVideo className="mr-1.5" /> Start Call
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// StatCard component
const StatCard = ({ icon, title, value, bgColor }: { icon: React.ReactNode, title: string, value: string | number, bgColor: string }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center text-white`}>
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-2xl font-bold text-black">{value}</h3>
          <p className="text-sm text-black">{title}</p>
        </div>
      </div>
    </div>
  );
};

// QuickAction component
const QuickAction = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) => {
  return (
    <button 
      onClick={onClick} 
      className="flex flex-col items-center justify-center bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow border border-gray-100"
    >
      <div className="text-blue-600 text-2xl mb-2">
        {icon}
      </div>
      <span className="text-sm text-black">{label}</span>
    </button>
  );
};

export default function DoctorDashboard() {
  const [date] = useState(new Date());
  
  // Format current date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
  
  // Handle quick actions
  const handleQuickAction = (action: string) => {
    console.log(`Quick action triggered: ${action}`);
    // Implement actual actions (redirect, modal, etc)
  };

  return (
    <div className="space-y-6 max-w-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-black">Welcome, Dr. Sarah</h1>
        <p className="text-black">{formattedDate}</p>
      </div>
      
      {/* Stats section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<FaUserCircle size={20} />} 
          title="Total Patients" 
          value={patientSummary.total} 
          bgColor="bg-blue-600" 
        />
        <StatCard 
          icon={<FaCalendarDay size={20} />} 
          title="Today's Appointments" 
          value={todayAppointments.length} 
          bgColor="bg-green-600" 
        />
        <StatCard 
          icon={<FaVideo size={20} />} 
          title="Pending Calls" 
          value={2} 
          bgColor="bg-purple-600" 
        />
        <StatCard 
          icon={<FaFileAlt size={20} />} 
          title="New Reports" 
          value={5} 
          bgColor="bg-yellow-600" 
        />
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickAction 
          icon={<FaVideo />} 
          label="Start Video Call" 
          onClick={() => handleQuickAction('video')} 
        />
        <QuickAction 
          icon={<FaFileAlt />} 
          label="New Prescription" 
          onClick={() => handleQuickAction('prescription')} 
        />
        <QuickAction 
          icon={<FaUserInjured />} 
          label="Patient Records" 
          onClick={() => handleQuickAction('records')} 
        />
        <QuickAction 
          icon={<FaCalendarDay />} 
          label="Schedule Appointment" 
          onClick={() => handleQuickAction('schedule')} 
        />
      </div>
      
      {/* Today's Appointments */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">Today's Appointments</h2>
          <button className="text-blue-600 text-sm hover:text-blue-800">
            View All
          </button>
        </div>
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {todayAppointments.map(appointment => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      </div>
    </div>
  );
} 