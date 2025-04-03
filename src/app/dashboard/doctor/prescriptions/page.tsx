"use client";

import React, { useState } from 'react';
import { 
  FaFileMedical, 
  FaPlus, 
  FaSearch, 
  FaFilter, 
  FaCalendarAlt,
  FaUserCircle,
  FaClock,
  FaPills,
  FaNotesMedical,
  FaAngleDown,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaPrint
} from 'react-icons/fa';

// Mock prescription data
const prescriptions = [
  {
    id: 1,
    patientName: 'John Smith',
    patientAge: 45,
    medications: [
      { name: 'Amoxicillin', dosage: '500mg', frequency: 'Three times daily', duration: '7 days' },
      { name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed for pain', duration: '5 days' }
    ],
    diagnosis: 'Acute Bronchitis',
    createdDate: 'April 2, 2025',
    status: 'active',
    notes: 'Take with food. Complete full course of antibiotics.',
    profileImage: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 2,
    patientName: 'Emma Johnson',
    patientAge: 32,
    medications: [
      { name: 'Diclofenac', dosage: '75mg', frequency: 'Twice daily', duration: '14 days' },
      { name: 'Paracetamol', dosage: '500mg', frequency: 'Four times daily', duration: '7 days' }
    ],
    diagnosis: 'Rheumatoid Arthritis Flare-up',
    createdDate: 'April 1, 2025',
    status: 'active',
    notes: 'Follow up in two weeks. Apply heat to affected joints.',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 3,
    patientName: 'Robert Davis',
    patientAge: 58,
    medications: [
      { name: 'Atorvastatin', dosage: '40mg', frequency: 'Once daily at night', duration: '30 days' },
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days' }
    ],
    diagnosis: 'Hypertension, Hyperlipidemia',
    createdDate: 'March 30, 2025',
    status: 'active',
    notes: 'Monitor blood pressure daily. Maintain low-salt diet.',
    profileImage: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 4,
    patientName: 'Sarah Wilson',
    patientAge: 29,
    medications: [
      { name: 'Fluoxetine', dosage: '20mg', frequency: 'Once daily in the morning', duration: '30 days' }
    ],
    diagnosis: 'Generalized Anxiety Disorder',
    createdDate: 'March 28, 2025',
    status: 'active',
    notes: 'Counseling recommended. Avoid alcohol.',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
];

// Prescription Card component
const PrescriptionCard = ({ prescription }: { prescription: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src={prescription.profileImage} 
              alt={prescription.patientName} 
              className="w-12 h-12 rounded-full object-cover shadow-sm"
            />
            <div className="ml-3">
              <h3 className="font-semibold text-black">{prescription.patientName}</h3>
              <p className="text-sm text-black">{prescription.patientAge} years • {prescription.diagnosis}</p>
            </div>
          </div>
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-black hover:bg-gray-100 rounded-full"
            >
              <FaEllipsisV />
            </button>
            
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-100">
                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-black hover:bg-gray-100">
                    <FaEdit className="mr-2 text-blue-600" /> Edit Prescription
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-black hover:bg-gray-100">
                    <FaPrint className="mr-2 text-green-600" /> Print
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-3">
          <FaCalendarAlt className="text-blue-500 mr-2" />
          <span className="text-sm text-black">{prescription.createdDate}</span>
          
          <span className="ml-4 px-2.5 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            Active
          </span>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium text-black mb-2">Medications:</h4>
          <ul className="space-y-2">
            {prescription.medications.map((med: any, idx: number) => (
              <li key={idx} className="flex">
                <div className="p-1 bg-blue-100 rounded-md flex items-center justify-center mr-2">
                  <FaPills className="text-blue-600 text-sm" />
                </div>
                <span className="text-sm text-black">
                  {med.name} {med.dosage}, {med.frequency}, for {med.duration}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        {prescription.notes && (
          <div className="mb-3">
            <h4 className="text-sm font-medium text-black mb-1">Notes:</h4>
            <p className="text-sm text-black">{prescription.notes}</p>
          </div>
        )}
        
        <div className="flex justify-end mt-4">
          <button className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition shadow-sm">
            <FaEdit className="mr-1.5" /> Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default function PrescriptionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || prescription.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">Prescriptions</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm flex items-center">
          <FaPlus className="mr-1.5" /> New Prescription
        </button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Search by patient or diagnosis..." 
            className="pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        
        <div className="relative">
          <div className="flex items-center p-2 bg-white border border-gray-300 rounded-lg w-44 cursor-pointer">
            <FaFilter className="text-gray-400 mr-2" />
            <select 
              className="appearance-none bg-transparent flex-1 text-black focus:outline-none cursor-pointer"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="canceled">Canceled</option>
            </select>
            <FaAngleDown className="text-gray-400" />
          </div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
              <FaFileMedical />
            </div>
            <div>
              <p className="text-sm text-black">Total Prescriptions</p>
              <p className="text-lg font-bold text-black">{prescriptions.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
              <FaNotesMedical />
            </div>
            <div>
              <p className="text-sm text-black">Active</p>
              <p className="text-lg font-bold text-black">{prescriptions.filter(p => p.status === 'active').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3">
              <FaClock />
            </div>
            <div>
              <p className="text-sm text-black">Expiring Soon</p>
              <p className="text-lg font-bold text-black">2</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
              <FaUserCircle />
            </div>
            <div>
              <p className="text-sm text-black">Patients</p>
              <p className="text-lg font-bold text-black">
                {new Set(prescriptions.map(p => p.patientName)).size}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Prescriptions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPrescriptions.map(prescription => (
          <PrescriptionCard key={prescription.id} prescription={prescription} />
        ))}
        
        {filteredPrescriptions.length === 0 && (
          <div className="col-span-full text-center py-10">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <FaFileMedical className="text-blue-600 text-xl" />
            </div>
            <h3 className="text-lg font-medium text-black mb-1">No Prescriptions Found</h3>
            <p className="text-black mb-4">No prescriptions match your current search or filters.</p>
            {searchTerm || filterStatus !== 'all' ? (
              <button onClick={() => {setSearchTerm(''); setFilterStatus('all');}} className="text-blue-600 font-medium hover:text-blue-800">
                Clear Filters
              </button>
            ) : (
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm">
                Create New Prescription
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 