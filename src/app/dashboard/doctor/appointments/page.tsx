"use client";

import React, { useState } from 'react';
import { 
  FaCalendarAlt, 
  FaListUl, 
  FaChevronLeft, 
  FaChevronRight,
  FaUser,
  FaClock,
  FaVideo,
  FaHospital,
  FaSearch,
  FaPlus,
  FaEllipsisV
} from 'react-icons/fa';

// Mock appointment data
const mockAppointments = [
  {
    id: 1,
    patientName: 'John Smith',
    patientAge: 45,
    appointmentType: 'Follow-up',
    date: '2023-10-15',
    time: '09:00 AM',
    duration: 30,
    status: 'confirmed',
    isOnline: true,
    reason: 'Persistent cough, mild fever',
    profileImage: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 2,
    patientName: 'Emma Johnson',
    patientAge: 32,
    appointmentType: 'New Patient',
    date: '2023-10-15',
    time: '10:30 AM',
    duration: 45,
    status: 'confirmed',
    isOnline: false,
    reason: 'Joint pain, difficulty walking',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 3,
    patientName: 'Robert Davis',
    patientAge: 58,
    appointmentType: 'Consultation',
    date: '2023-10-16',
    time: '01:00 PM',
    duration: 30,
    status: 'pending',
    isOnline: true,
    reason: 'Shortness of breath, chest pain',
    profileImage: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 4,
    patientName: 'Sarah Wilson',
    patientAge: 28,
    appointmentType: 'Follow-up',
    date: '2023-10-17',
    time: '03:30 PM',
    duration: 30,
    status: 'confirmed',
    isOnline: true,
    reason: 'Migraine, sensitivity to light',
    profileImage: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 5,
    patientName: 'David Brown',
    patientAge: 62,
    appointmentType: 'Follow-up',
    date: '2023-10-18',
    time: '11:00 AM',
    duration: 30,
    status: 'confirmed',
    isOnline: false,
    reason: 'Blood pressure check, medication review',
    profileImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 6,
    patientName: 'Linda Martinez',
    patientAge: 41,
    appointmentType: 'New Patient',
    date: '2023-10-19',
    time: '02:00 PM',
    duration: 45,
    status: 'pending',
    isOnline: true,
    reason: 'Chronic fatigue, sleep issues',
    profileImage: 'https://images.unsplash.com/photo-1592621385612-4d7129426394?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  }
];

// Time slots for the calendar view
const timeSlots = [
  '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM'
];

// Generate days of the week
const generateWeekDays = (currentDate: Date) => {
  const dates = [];
  const startOfWeek = new Date(currentDate);
  const day = startOfWeek.getDay();
  
  // Adjust to start from Monday (or Sunday if preferred)
  startOfWeek.setDate(startOfWeek.getDate() - day + (day === 0 ? -6 : 1));
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  
  return dates;
};

// Format date to YYYY-MM-DD
const formatDateToYMD = (date: Date) => {
  return date.toISOString().split('T')[0];
};

// Format time for comparison
const formatTimeForCompare = (time: string) => {
  return time.toLowerCase().replace(' ', '');
};

// Component to display calendar events
const CalendarEvent = ({ appointment }: { appointment: any }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-100 border-gray-300 text-black';
    }
  };

  return (
    <div 
      className={`rounded-md p-2 border text-xs shadow-sm cursor-pointer hover:shadow-md transition-shadow ${getStatusColor(appointment.status)}`}
    >
      <div className="flex items-center mb-1">
        <div className="w-5 h-5 rounded-full overflow-hidden mr-1">
          <img 
            src={appointment.profileImage}
            alt={appointment.patientName}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="font-medium truncate">{appointment.patientName}</span>
      </div>
      <div className="flex justify-between">
        <span>{appointment.time}</span>
        <span>{appointment.isOnline ? 'Online' : 'In-person'}</span>
      </div>
    </div>
  );
};

// ListViewItem component for list view
const ListViewItem = ({ appointment }: { appointment: any }) => {
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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100">
      <div className="p-4">
        <div className="flex justify-between items-start">
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
          <div className="flex flex-col items-end">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
            <div className="mt-1 flex items-center">
              <FaClock className="text-gray-400 mr-1" size={12} />
              <span className="text-sm text-black">{appointment.time} • {appointment.duration} min</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex items-center">
            <FaCalendarAlt className="text-blue-500 mr-2" />
            <span className="text-sm text-black">{formatDate(appointment.date)}</span>
          </div>
          <div className="flex items-center">
            {appointment.isOnline ? (
              <FaVideo className="text-blue-500 mr-2" />
            ) : (
              <FaHospital className="text-blue-500 mr-2" />
            )}
            <span className="text-sm text-black">
              {appointment.isOnline ? 'Teleconsultation' : 'In-person visit'}
            </span>
          </div>
        </div>
        
        <div className="mt-2">
          <p className="text-sm text-black">
            <span className="font-medium">Reason:</span> {appointment.reason}
          </p>
        </div>
        
        <div className="mt-4 flex justify-between">
          <button className="text-blue-600 text-sm hover:text-blue-800">
            View Details
          </button>
          <div className="space-x-2">
            {appointment.isOnline && appointment.status === 'confirmed' && (
              <button className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition shadow-sm">
                <FaVideo className="mr-1.5" /> Start Call
              </button>
            )}
            <button className="p-2 text-black rounded-full hover:bg-gray-100">
              <FaEllipsisV size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DoctorAppointmentsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [searchQuery, setSearchQuery] = useState('');
  
  const weekDays = generateWeekDays(currentDate);
  
  // Filter appointments based on search query
  const filteredAppointments = mockAppointments.filter(appointment => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      appointment.patientName.toLowerCase().includes(query) ||
      appointment.reason.toLowerCase().includes(query) ||
      appointment.appointmentType.toLowerCase().includes(query)
    );
  });
  
  // Move to previous week
  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };
  
  // Move to next week
  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };
  
  // Get appointments for a specific day and time
  const getAppointmentsForSlot = (date: Date, timeSlot: string) => {
    const dateString = formatDateToYMD(date);
    return filteredAppointments.filter(
      appointment => 
        appointment.date === dateString && 
        formatTimeForCompare(appointment.time) === formatTimeForCompare(timeSlot)
    );
  };
  
  // Format month and year for header
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Get current week date range string
  const getWeekRangeString = () => {
    const startDate = weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endDate = weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${startDate} - ${endDate}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Appointments</h1>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md">
          <FaPlus className="mr-2" /> New Appointment
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          {/* Calendar navigation */}
          <div className="flex items-center">
            <button 
              onClick={goToPreviousWeek}
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-black mr-2"
            >
              <FaChevronLeft />
            </button>
            <div className="text-black">
              <span className="font-medium">{getWeekRangeString()}</span>
            </div>
            <button 
              onClick={goToNextWeek}
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-black ml-2"
            >
              <FaChevronRight />
            </button>
          </div>
          
          {/* Search and view controls */}
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-black w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
            </div>
            
            <div className="bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('calendar')}
                className={`p-2 rounded-md ${
                  viewMode === 'calendar' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-black hover:bg-gray-200'
                }`}
              >
                <FaCalendarAlt />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${
                  viewMode === 'list' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-black hover:bg-gray-200'
                }`}
              >
                <FaListUl />
              </button>
            </div>
          </div>
        </div>
        
        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              {/* Calendar header with days */}
              <div className="grid grid-cols-8 gap-2">
                <div className="sticky left-0 z-10 bg-white py-2 px-3 font-medium text-black">
                  Time
                </div>
                {weekDays.map((date, index) => {
                  const isToday = formatDateToYMD(date) === formatDateToYMD(new Date());
                  return (
                    <div 
                      key={index} 
                      className={`text-center py-2 px-3 ${isToday ? 'bg-blue-50 text-blue-800 rounded-lg' : 'text-black'}`}
                    >
                      <div className="font-medium">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className={`text-sm ${isToday ? 'text-blue-800' : 'text-black'}`}>
                        {date.getDate()}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Calendar body with time slots */}
              <div className="mt-2">
                {timeSlots.map((timeSlot, timeIndex) => (
                  <div key={timeIndex} className="grid grid-cols-8 gap-2 border-t border-gray-100">
                    <div className="sticky left-0 z-10 bg-white py-3 px-3 text-sm text-black font-medium border-r border-gray-100">
                      {timeSlot}
                    </div>
                    {weekDays.map((date, dateIndex) => {
                      const appointments = getAppointmentsForSlot(date, timeSlot);
                      const isNow = 
                        formatDateToYMD(date) === formatDateToYMD(new Date()) && 
                        formatTimeForCompare(timeSlot) === formatTimeForCompare(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true}));
                      
                      return (
                        <div 
                          key={dateIndex} 
                          className={`py-2 px-1 min-h-[60px] ${isNow ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                        >
                          {appointments.map(appointment => (
                            <CalendarEvent key={appointment.id} appointment={appointment} />
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {filteredAppointments.length > 0 ? (
              <>
                {filteredAppointments.map(appointment => (
                  <ListViewItem key={appointment.id} appointment={appointment} />
                ))}
              </>
            ) : (
              <div className="text-center py-8">
                <FaCalendarAlt className="mx-auto text-gray-300 text-4xl mb-3" />
                <h3 className="text-lg font-medium text-black">No appointments found</h3>
                <p className="text-black">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 