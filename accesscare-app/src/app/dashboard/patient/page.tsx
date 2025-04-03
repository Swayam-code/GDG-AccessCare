"use client";

import React from 'react';
import { 
  FaCalendarDay, 
  FaHeartbeat, 
  FaUserMd, 
  FaBell, 
  FaPlus,
  FaVideo,
  FaRobot,
  FaChartLine,
  FaClock,
  FaBook,
  FaFileMedical,
  FaArrowRight
} from 'react-icons/fa';

// Mock appointment data
const upcomingAppointments = [
  {
    id: 1,
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    appointmentType: 'Follow-up',
    time: '09:00 AM',
    date: 'Apr 15, 2025',
    status: 'confirmed',
    isOnline: true,
    doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 2,
    doctorName: 'Dr. Michael Brown',
    specialty: 'Pulmonologist',
    appointmentType: 'Check-up',
    time: '02:30 PM',
    date: 'Apr 18, 2025',
    status: 'confirmed',
    isOnline: false,
    doctorImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  }
];

// Mock health stats data
const healthStats = {
  heartRate: '72 bpm',
  bloodPressure: '120/80 mmHg',
  bloodSugar: '95 mg/dL'
};

// Mock recent activities
const recentActivities = [
  {
    id: 1,
    type: 'appointment',
    description: 'Completed appointment with Dr. Sarah Johnson',
    date: 'Apr 2, 2025',
    time: '10:30 AM'
  },
  {
    id: 2,
    type: 'medication',
    description: 'Renewed prescription for Albuterol inhaler',
    date: 'Mar 28, 2025',
    time: '03:15 PM'
  }
];

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
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="relative">
              <img 
                src={appointment.doctorImage} 
                alt={appointment.doctorName} 
                className="w-12 h-12 rounded-full object-cover shadow-sm"
              />
              {appointment.isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              )}
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-black">{appointment.doctorName}</h3>
              <p className="text-sm text-black">{appointment.specialty}</p>
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
          <FaCalendarDay className="text-blue-500 mr-2" />
          <span className="text-sm text-black">{appointment.date}</span>
          <span className="mx-2 text-gray-300">|</span>
          <FaClock className="text-blue-500 mr-2" />
          <span className="text-sm text-black">{appointment.time}</span>
        </div>
        
        <div className="flex justify-end">
          {appointment.isOnline ? (
            <button className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition shadow-sm">
              <FaVideo className="mr-1.5" /> Join Call
            </button>
          ) : (
            <button className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition shadow-sm">
              <FaCalendarDay className="mr-1.5" /> View Details
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
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center text-white`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm text-black">{title}</p>
          <h3 className="text-xl font-bold text-black">{value}</h3>
        </div>
      </div>
    </div>
  );
};

// QuickAction component
const QuickAction = ({ icon, label, bgColor, href }: { icon: React.ReactNode, label: string, bgColor: string, href: string }) => {
  return (
    <a 
      href={href}
      className="flex flex-col items-center justify-center bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow border border-gray-100"
    >
      <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center text-white mb-2`}>
        {icon}
      </div>
      <span className="text-sm text-black text-center">{label}</span>
    </a>
  );
};

// ActivityItem component
const ActivityItem = ({ activity }: { activity: any }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <FaUserMd className="text-blue-500" />;
      case 'medication':
        return <FaFileMedical className="text-green-500" />;
      default:
        return <FaBell className="text-yellow-500" />;
    }
  };

  return (
    <div className="flex items-start py-3 border-b border-gray-100 last:border-b-0">
      <div className="p-2 bg-gray-100 rounded-full mr-3 flex-shrink-0">
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1">
        <p className="text-black">{activity.description}</p>
        <div className="flex items-center mt-1 text-sm text-black">
          <span>{activity.date}</span>
          <span className="mx-2 text-gray-300">|</span>
          <span>{activity.time}</span>
        </div>
      </div>
    </div>
  );
};

export default function PatientDashboard() {
  return (
    <div className="space-y-6 max-w-full">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black">Dashboard</h1>
          <p className="text-black mt-1">Welcome to your health dashboard</p>
        </div>
        <div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm flex items-center">
            <FaPlus className="mr-2" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>
      
      {/* Health stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard 
          icon={<FaHeartbeat size={20} />} 
          title="Heart Rate" 
          value={healthStats.heartRate} 
          bgColor="bg-red-500" 
        />
        <StatCard 
          icon={<FaChartLine size={20} />} 
          title="Blood Pressure" 
          value={healthStats.bloodPressure} 
          bgColor="bg-blue-500" 
        />
        <StatCard 
          icon={<FaFileMedical size={20} />} 
          title="Blood Sugar" 
          value={healthStats.bloodSugar} 
          bgColor="bg-green-500" 
        />
      </div>
      
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Appointments & Activities */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-black">Upcoming Appointments</h2>
              <a href="/dashboard/patient/appointments" className="text-blue-600 text-sm hover:text-blue-800 font-medium">
                View All
              </a>
            </div>
            
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-black">Recent Activity</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {recentActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Right column - Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h2 className="text-xl font-bold text-black mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <QuickAction 
                icon={<FaRobot size={20} />} 
                label="Health Assistant" 
                bgColor="bg-purple-500"
                href="/dashboard/patient/health-assistant" 
              />
              <QuickAction 
                icon={<FaFileMedical size={20} />} 
                label="Medical Records" 
                bgColor="bg-green-500"
                href="/dashboard/patient/medical-records" 
              />
              <QuickAction 
                icon={<FaVideo size={20} />} 
                label="Teleconsultation" 
                bgColor="bg-blue-500"
                href="/dashboard/patient/teleconsultation" 
              />
              <QuickAction 
                icon={<FaBook size={20} />} 
                label="Education" 
                bgColor="bg-yellow-500"
                href="/dashboard/patient/education" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 