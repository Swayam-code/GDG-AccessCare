"use client";

import React, { useState } from 'react';
import { 
  FaVideo, 
  FaCalendarAlt, 
  FaUserMd, 
  FaClock,
  FaPlus
} from 'react-icons/fa';

// Mock data for upcoming teleconsultations
const upcomingConsultations = [
  {
    id: 1,
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    date: '2023-10-15',
    time: '10:00 AM',
    duration: '30 min',
    status: 'Scheduled',
    profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80',
  },
  {
    id: 2,
    doctorName: 'Dr. Michael Rodriguez',
    specialty: 'Dermatologist',
    date: '2023-10-22',
    time: '2:30 PM',
    duration: '45 min',
    status: 'Confirmed',
    profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80',
  },
];

// Past consultations
const pastConsultations = [
  {
    id: 3,
    doctorName: 'Dr. Emily Chen',
    specialty: 'Neurologist',
    date: '2023-09-20',
    time: '11:00 AM',
    duration: '30 min',
    status: 'Completed',
    notes: 'Follow-up in 3 weeks',
    profileImage: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80',
  },
  {
    id: 4,
    doctorName: 'Dr. David Kim',
    specialty: 'General Physician',
    date: '2023-08-15',
    time: '9:30 AM',
    duration: '20 min',
    status: 'Completed',
    notes: 'Prescription sent to pharmacy',
    profileImage: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80',
  },
];

// Consultation card component
const ConsultationCard = ({ consultation }: { consultation: any }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isUpcoming = ['scheduled', 'confirmed'].includes(consultation.status.toLowerCase());
  const canJoin = isUpcoming && new Date(consultation.date) <= new Date();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <img 
            src={consultation.profileImage} 
            alt={consultation.doctorName} 
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="ml-3">
            <h3 className="font-semibold text-gray-800">{consultation.doctorName}</h3>
            <p className="text-sm text-gray-600">{consultation.specialty}</p>
          </div>
          <span className={`ml-auto px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(consultation.status)}`}>
            {consultation.status}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-700">
          <div className="flex items-center">
            <FaCalendarAlt className="text-blue-500 mr-1.5" />
            <span>{formatDate(consultation.date)}</span>
          </div>
          <div className="flex items-center">
            <FaClock className="text-blue-500 mr-1.5" />
            <span>{consultation.time} ({consultation.duration})</span>
          </div>
        </div>
        
        {canJoin ? (
          <button className="w-full py-2 bg-blue-600 text-white rounded-md flex items-center justify-center hover:bg-blue-700 transition">
            <FaVideo className="mr-2" /> Join Consultation
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-md flex items-center justify-center hover:bg-gray-50 transition"
            >
              {showDetails ? 'Hide Details' : 'View Details'}
            </button>
            
            {isUpcoming && (
              <button className="flex-1 py-2 border border-red-300 text-red-700 rounded-md flex items-center justify-center hover:bg-red-50 transition">
                Cancel
              </button>
            )}
          </div>
        )}
        
        {showDetails && consultation.notes && (
          <div className="mt-3 p-3 bg-gray-50 rounded-md text-sm text-gray-700">
            <p className="font-medium mb-1">Doctor's Notes:</p>
            <p>{consultation.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// VideoCall component for the test call section
const TestVideoCall = () => {
  const [isTesting, setIsTesting] = useState(false);
  const [cameraWorking, setCameraWorking] = useState(false);
  const [micWorking, setMicWorking] = useState(false);
  const [speakerWorking, setSpeakerWorking] = useState(false);
  
  const startTest = () => {
    setIsTesting(true);
    // Simulate device checks
    setTimeout(() => setCameraWorking(true), 1000);
    setTimeout(() => setMicWorking(true), 2000);
    setTimeout(() => setSpeakerWorking(true), 3000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
        <h3 className="text-lg font-semibold text-white">Test Your Setup</h3>
      </div>
      <div className="p-4">
        <p className="text-gray-600 mb-4">
          Before your teleconsultation, make sure your camera, microphone, and speakers are working properly.
        </p>
        
        {!isTesting ? (
          <button
            onClick={startTest}
            className="w-full py-2 bg-blue-600 text-white rounded-md flex items-center justify-center hover:bg-blue-700 transition"
          >
            <FaVideo className="mr-2" /> Start Test Call
          </button>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-md p-4 aspect-video flex items-center justify-center">
              {cameraWorking ? (
                <img 
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Camera test" 
                  className="max-w-full max-h-full rounded-md"
                />
              ) : (
                <div className="animate-pulse flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mb-2"></div>
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full mr-2 ${cameraWorking ? 'bg-green-500' : 'bg-gray-300 animate-pulse'}`}></div>
                <span className="text-sm">Camera: {cameraWorking ? 'Working' : 'Checking...'}</span>
              </div>
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full mr-2 ${micWorking ? 'bg-green-500' : 'bg-gray-300 animate-pulse'}`}></div>
                <span className="text-sm">Microphone: {micWorking ? 'Working' : 'Checking...'}</span>
              </div>
              <div className="flex items-center">
                <div className={`w-4 h-4 rounded-full mr-2 ${speakerWorking ? 'bg-green-500' : 'bg-gray-300 animate-pulse'}`}></div>
                <span className="text-sm">Speaker: {speakerWorking ? 'Working' : 'Checking...'}</span>
              </div>
            </div>
            
            {cameraWorking && micWorking && speakerWorking && (
              <div className="bg-green-50 p-3 rounded-md border border-green-200 text-green-700 text-sm">
                All devices are working correctly! You're ready for your teleconsultation.
              </div>
            )}
            
            <button
              onClick={() => setIsTesting(false)}
              className="w-full py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
            >
              Close Test
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Main component for Teleconsultation page
export default function TeleconsultationPage() {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Teleconsultation</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <FaPlus className="mr-2" /> Book New Consultation
        </button>
      </div>

      <div className="flex bg-white rounded-lg p-1 shadow-sm inline-block">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            activeTab === 'upcoming'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            activeTab === 'past'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Past Consultations
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className={`lg:col-span-2 space-y-4 ${activeTab !== 'upcoming' && 'hidden lg:block'}`}>
          <h2 className="text-xl font-semibold text-gray-800 lg:hidden">
            {activeTab === 'upcoming' ? 'Upcoming Consultations' : 'Past Consultations'}
          </h2>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {activeTab === 'upcoming' 
              ? upcomingConsultations.map(consultation => (
                  <ConsultationCard key={consultation.id} consultation={consultation} />
                ))
              : pastConsultations.map(consultation => (
                  <ConsultationCard key={consultation.id} consultation={consultation} />
                ))
            }
            
            {/* Empty state */}
            {((activeTab === 'upcoming' && upcomingConsultations.length === 0) || 
              (activeTab === 'past' && pastConsultations.length === 0)) && (
              <div className="col-span-full bg-gray-50 rounded-lg p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <FaVideo className="text-gray-400 text-xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {activeTab === 'upcoming' ? 'No upcoming consultations' : 'No past consultations'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {activeTab === 'upcoming' 
                    ? 'Book a teleconsultation with a doctor to get started' 
                    : 'Your past consultations will appear here'}
                </p>
                {activeTab === 'upcoming' && (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Book Consultation
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 hidden lg:block">
            Consultation Tools
          </h2>
          
          <TestVideoCall />
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4">
              <h3 className="text-lg font-semibold text-white">Consultation Tips</h3>
            </div>
            <div className="p-4">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>Find a quiet, well-lit space for your call</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>Prepare a list of symptoms and questions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>Have your medication list ready</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>Join 5 minutes before the scheduled time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span>Keep a pen and paper handy for notes</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-3">
                If you're experiencing technical issues or have questions about your teleconsultation:
              </p>
              <button className="w-full py-2 border border-blue-500 text-blue-600 rounded-md hover:bg-blue-50 transition">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}