"use client";

import React, { useState } from 'react';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaUser, 
  FaVideo, 
  FaStethoscope,
  FaEllipsisV,
  FaPlus,
  FaSearch
} from 'react-icons/fa';

// Mock data for appointments
const upcomingAppointments = [
  {
    id: 1,
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    date: '2023-10-15',
    time: '10:00 AM',
    status: 'Confirmed',
    isOnline: true,
    profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80',
  },
  {
    id: 2,
    doctorName: 'Dr. Michael Rodriguez',
    specialty: 'Dermatologist',
    date: '2023-10-22',
    time: '2:30 PM',
    status: 'Pending',
    isOnline: false,
    profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80',
  },
];

const pastAppointments = [
  {
    id: 3,
    doctorName: 'Dr. Emily Chen',
    specialty: 'Neurologist',
    date: '2023-09-30',
    time: '11:15 AM',
    status: 'Completed',
    isOnline: true,
    profileImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80',
  },
  {
    id: 4,
    doctorName: 'Dr. David Kim',
    specialty: 'General Physician',
    date: '2023-09-15',
    time: '9:00 AM',
    status: 'Cancelled',
    isOnline: false,
    profileImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80',
  },
];

// Available time slots for booking
const availableTimeSlots = [
  { id: 1, time: '9:00 AM', available: true },
  { id: 2, time: '10:00 AM', available: false },
  { id: 3, time: '11:00 AM', available: true },
  { id: 4, time: '1:00 PM', available: true },
  { id: 5, time: '2:00 PM', available: false },
  { id: 6, time: '3:00 PM', available: true },
  { id: 7, time: '4:00 PM', available: true },
  { id: 8, time: '5:00 PM', available: false },
];

// Available doctors for booking
const availableDoctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    rating: 4.9,
    experience: '12 years',
    profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80',
  },
  {
    id: 2,
    name: 'Dr. Michael Rodriguez',
    specialty: 'Dermatologist',
    rating: 4.7,
    experience: '8 years',
    profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80',
  },
  {
    id: 3,
    name: 'Dr. Emily Chen',
    specialty: 'Neurologist',
    rating: 4.8,
    experience: '10 years',
    profileImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80',
  },
  {
    id: 4,
    name: 'Dr. David Kim',
    specialty: 'General Physician',
    rating: 4.6,
    experience: '7 years',
    profileImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80',
  },
];

// Appointment card component
const AppointmentCard = ({ appointment }: { appointment: any }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-black';
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="relative">
              <img 
                src={appointment.profileImage} 
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
          <div className="relative">
            <button className="p-2 text-black rounded-full hover:bg-gray-100">
              <FaEllipsisV />
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center">
            <FaCalendarAlt className="text-blue-500 mr-2" />
            <span className="text-sm text-black">{formatDate(appointment.date)}</span>
          </div>
          <div className="flex items-center">
            <FaClock className="text-blue-500 mr-2" />
            <span className="text-sm text-black">{appointment.time}</span>
          </div>
          <div className="flex items-center">
            <FaStethoscope className="text-blue-500 mr-2" />
            <span className="text-sm text-black">{appointment.specialty}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
            {appointment.status}
          </span>
          {appointment.status === 'Confirmed' && appointment.isOnline && (
            <button className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition shadow-sm">
              <FaVideo className="mr-1.5" /> Join Call
            </button>
          )}
          {appointment.status === 'Confirmed' && !appointment.isOnline && (
            <button className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition shadow-sm">
              <FaUser className="mr-1.5" /> Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Booking form component
const BookingForm = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    specialty: '',
    appointmentType: 'online',
    date: '',
    timeSlot: '',
    doctor: 0,
    reason: '',
  });

  const specialties = [
    'Cardiology', 'Dermatology', 'Neurology', 'General Medicine', 
    'Pediatrics', 'Orthopedics', 'Ophthalmology', 'Gynecology'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the API call to book the appointment
    console.log("Appointment booked:", formData);
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
        <h2 className="text-xl font-bold text-white">Book an Appointment</h2>
      </div>
      
      <div className="p-6">
        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-xs font-medium text-black">Step {step} of 3</span>
            <span className="text-xs font-medium text-black">{Math.round((step / 3) * 100)}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(step / 3) * 100}%` }} 
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-black mb-1">
                  Specialty
                </label>
                <select
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                >
                  <option value="">Select a specialty</option>
                  {specialties.map((specialty, index) => (
                    <option key={index} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Appointment Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                    formData.appointmentType === 'online' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 text-black'
                  }`}>
                    <input
                      type="radio"
                      name="appointmentType"
                      value="online"
                      checked={formData.appointmentType === 'online'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <FaVideo className={`mr-2 ${
                      formData.appointmentType === 'online' ? 'text-blue-600' : 'text-black'
                    }`} />
                    <span>Online Consultation</span>
                  </label>
                  <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                    formData.appointmentType === 'in-person' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-300 text-black'
                  }`}>
                    <input
                      type="radio"
                      name="appointmentType"
                      value="in-person"
                      checked={formData.appointmentType === 'in-person'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <FaUser className={`mr-2 ${
                      formData.appointmentType === 'in-person' ? 'text-blue-600' : 'text-black'
                    }`} />
                    <span>In-Person Visit</span>
                  </label>
                </div>
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-black mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Available Time Slots
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {availableTimeSlots.map((slot) => (
                    <label
                      key={slot.id}
                      className={`px-3 py-3 border rounded-lg text-center cursor-pointer transition-colors ${
                        !slot.available 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : formData.timeSlot === slot.time
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300 text-black'
                      }`}
                    >
                      <input
                        type="radio"
                        name="timeSlot"
                        value={slot.time}
                        checked={formData.timeSlot === slot.time}
                        onChange={handleChange}
                        disabled={!slot.available}
                        className="sr-only"
                      />
                      <span className="text-sm">{slot.time}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Select Doctor
                </label>
                <div className="space-y-3">
                  {availableDoctors.map((doctor) => (
                    <label
                      key={doctor.id}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                        formData.doctor === doctor.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="doctor"
                        value={doctor.id}
                        checked={formData.doctor === doctor.id}
                        onChange={(e) => setFormData({ ...formData, doctor: parseInt(e.target.value) })}
                        className="sr-only"
                      />
                      <img 
                        src={doctor.profileImage} 
                        alt={doctor.name} 
                        className="w-12 h-12 rounded-full object-cover shadow-sm"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-black">{doctor.name}</div>
                        <div className="text-sm text-black">{doctor.specialty} • {doctor.experience}</div>
                      </div>
                      <div className="ml-auto flex items-center">
                        <span className="text-sm text-yellow-500 mr-1">★</span>
                        <span className="text-sm text-black">{doctor.rating}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-black mb-1">
                  Reason for Visit
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Please describe your symptoms or reason for the appointment..."
                  required
                ></textarea>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-black mb-2">Appointment Summary</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-black">Specialty:</span>
                    <span className="font-medium text-black">{formData.specialty || 'Not selected'}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-black">Type:</span>
                    <span className="font-medium text-black">
                      {formData.appointmentType === 'online' ? 'Online Consultation' : 'In-Person Visit'}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-black">Date:</span>
                    <span className="font-medium text-black">{formData.date || 'Not selected'}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-black">Time:</span>
                    <span className="font-medium text-black">{formData.timeSlot || 'Not selected'}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-black">Doctor:</span>
                    <span className="font-medium text-black">
                      {formData.doctor ? availableDoctors.find(d => d.id === formData.doctor)?.name : 'Not selected'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition shadow-sm"
              >
                Previous
              </button>
            )}
            <div className="ml-auto">
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                  Book Appointment
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main component for Appointments page
export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Appointments</h1>
        <button
          onClick={() => setShowBookingForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
        >
          <FaPlus className="mr-2" /> Book Appointment
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div className="flex bg-white rounded-lg p-1 shadow-md">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'upcoming'
                ? 'bg-blue-100 text-blue-700'
                : 'text-black hover:bg-gray-100'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'past'
                ? 'bg-blue-100 text-blue-700'
                : 'text-black hover:bg-gray-100'
            }`}
          >
            Past
          </button>
        </div>
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2">
        {activeTab === 'upcoming' 
          ? upcomingAppointments.map(appointment => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          : pastAppointments.map(appointment => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
        }
      </div>

      {/* Booking modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-3xl">
            <BookingForm onClose={() => setShowBookingForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
} 