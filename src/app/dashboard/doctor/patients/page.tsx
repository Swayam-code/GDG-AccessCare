"use client";

import React, { useState, useEffect } from 'react';
import { 
  FaSearch,
  FaFilter,
  FaPlus,
  FaSortAmountDown,
  FaSortAmountUp,
  FaUserCircle,
  FaFileMedical,
  FaCalendarAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClipboardList,
  FaVial,
  FaNotesMedical,
  FaVideo,
  FaHeartbeat,
  FaChevronRight,
  FaEllipsisV
} from 'react-icons/fa';

// Mock patient data
const mockPatients = [
  {
    id: 1,
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    phone: '(555) 123-4567',
    email: 'john.smith@example.com',
    condition: 'Hypertension',
    lastVisit: '2023-10-08',
    nextVisit: '2023-10-22',
    status: 'active',
    profileImage: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 2,
    name: 'Emma Johnson',
    age: 32,
    gender: 'Female',
    phone: '(555) 987-6543',
    email: 'emma.johnson@example.com',
    condition: 'Rheumatoid Arthritis',
    lastVisit: '2023-10-05',
    nextVisit: '2023-11-05',
    status: 'active',
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 3,
    name: 'Michael Davis',
    age: 58,
    gender: 'Male',
    phone: '(555) 765-4321',
    email: 'michael.davis@example.com',
    condition: 'Coronary Artery Disease',
    lastVisit: '2023-09-28',
    nextVisit: '2023-10-26',
    status: 'critical',
    profileImage: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    age: 28,
    gender: 'Female',
    phone: '(555) 234-5678',
    email: 'sarah.wilson@example.com',
    condition: 'Migraine',
    lastVisit: '2023-10-10',
    nextVisit: '2023-11-10',
    status: 'active',
    profileImage: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 5,
    name: 'David Brown',
    age: 62,
    gender: 'Male',
    phone: '(555) 876-5432',
    email: 'david.brown@example.com',
    condition: 'Type 2 Diabetes',
    lastVisit: '2023-09-20',
    nextVisit: '2023-10-20',
    status: 'inactive',
    profileImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 6,
    name: 'Linda Martinez',
    age: 41,
    gender: 'Female',
    phone: '(555) 345-6789',
    email: 'linda.martinez@example.com',
    condition: 'Depression',
    lastVisit: '2023-10-12',
    nextVisit: '2023-10-26',
    status: 'active',
    profileImage: 'https://images.unsplash.com/photo-1592621385612-4d7129426394?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 7,
    name: 'Robert Garcia',
    age: 54,
    gender: 'Male',
    phone: '(555) 456-7890',
    email: 'robert.garcia@example.com',
    condition: 'COPD',
    lastVisit: '2023-09-25',
    nextVisit: '2023-10-25',
    status: 'critical',
    profileImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  }
];

// Mock medical records
const mockMedicalRecords = [
  {
    id: 1,
    patientId: 1,
    type: 'visit',
    date: '2023-10-08',
    title: 'Regular Checkup',
    description: 'Blood pressure 140/90. Patient reports occasional headaches. Advised to continue medication and reduce sodium intake.',
    doctor: 'Dr. Sarah Johnson'
  },
  {
    id: 2,
    patientId: 1,
    type: 'test',
    date: '2023-09-15',
    title: 'Blood Test Results',
    description: 'Cholesterol levels slightly elevated. LDL: 130 mg/dL, HDL: 45 mg/dL, Triglycerides: 160 mg/dL.',
    doctor: 'Dr. Sarah Johnson'
  },
  {
    id: 3,
    patientId: 1,
    type: 'prescription',
    date: '2023-10-08',
    title: 'Medication Renewal',
    description: 'Renewed prescription for Lisinopril 10mg daily for blood pressure management.',
    doctor: 'Dr. Sarah Johnson'
  },
  {
    id: 4,
    patientId: 1,
    type: 'note',
    date: '2023-08-20',
    title: 'Diet Consultation',
    description: 'Referred to nutritionist for dietary guidance. Recommended DASH diet for hypertension management.',
    doctor: 'Dr. Michael Thompson'
  }
];

// Patient status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Record type icon component
const RecordTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'visit':
      return <FaCalendarAlt className="text-blue-500" />;
    case 'test':
      return <FaVial className="text-purple-500" />;
    case 'prescription':
      return <FaFileMedical className="text-green-500" />;
    case 'note':
      return <FaNotesMedical className="text-yellow-500" />;
    default:
      return <FaClipboardList className="text-gray-500" />;
  }
};

// Format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Patient detail component
const PatientDetail = ({ patient, onClose }: { patient: any, onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState('records');
  const patientRecords = mockMedicalRecords.filter(record => record.patientId === patient.id);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 p-4 md:p-6 text-white">
        <div className="flex justify-between items-start">
          <button 
            onClick={onClose}
            className="md:hidden p-2 bg-blue-700 rounded-full hover:bg-blue-800"
          >
            &larr;
          </button>
          <div className="flex flex-col md:flex-row items-center">
            <img 
              src={patient.profileImage} 
              alt={patient.name} 
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-white shadow-md"
            />
            <div className="md:ml-4 mt-2 md:mt-0 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold">{patient.name}</h2>
              <p className="text-blue-100">
                {patient.age} years • {patient.gender} • {patient.condition}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="hidden md:flex items-center px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition shadow-sm">
              <FaVideo className="mr-1.5" /> Call
            </button>
            <button className="p-2 bg-blue-700 rounded-full hover:bg-blue-800">
              <FaEllipsisV />
            </button>
          </div>
        </div>
      </div>
      
      {/* Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center">
          <FaPhoneAlt className="text-gray-400 mr-2" />
          <span className="text-black">{patient.phone}</span>
        </div>
        <div className="flex items-center">
          <FaEnvelope className="text-gray-400 mr-2" />
          <span className="text-black">{patient.email}</span>
        </div>
        <div className="flex items-center">
          <FaCalendarAlt className="text-gray-400 mr-2" />
          <span className="text-black">Next visit: {formatDate(patient.nextVisit)}</span>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('records')}
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === 'records'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-black hover:text-blue-600'
          }`}
        >
          Medical Records
        </button>
        <button
          onClick={() => setActiveTab('vitals')}
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === 'vitals'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-black hover:text-blue-600'
          }`}
        >
          Vitals & Metrics
        </button>
        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === 'prescriptions'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-black hover:text-blue-600'
          }`}
        >
          Prescriptions
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'records' && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-black">Medical History</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                Add New Record
              </button>
            </div>
            
            {patientRecords.length > 0 ? (
              <div className="space-y-3">
                {patientRecords.map(record => (
                  <div key={record.id} className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <div className="p-2 bg-gray-100 rounded-lg mr-3">
                        <RecordTypeIcon type={record.type} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-black">{record.title}</h4>
                          <span className="text-xs text-gray-500">{formatDate(record.date)}</span>
                        </div>
                        <p className="text-sm text-black mt-1">{record.description}</p>
                        <div className="mt-2 text-xs text-gray-500">
                          Added by {record.doctor}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FaClipboardList className="mx-auto text-gray-300 text-4xl mb-3" />
                <h3 className="text-lg font-medium text-black">No records found</h3>
                <p className="text-black">No medical records available for this patient</p>
              </div>
            )}
          </>
        )}
        
        {activeTab === 'vitals' && (
          <div className="text-center py-8">
            <FaHeartbeat className="mx-auto text-gray-300 text-4xl mb-3" />
            <h3 className="text-lg font-medium text-black">Vitals & Metrics</h3>
            <p className="text-black">
              Vitals tracking functionality coming soon
            </p>
          </div>
        )}
        
        {activeTab === 'prescriptions' && (
          <div className="text-center py-8">
            <FaFileMedical className="mx-auto text-gray-300 text-4xl mb-3" />
            <h3 className="text-lg font-medium text-black">Prescriptions</h3>
            <p className="text-black">
              Prescription management functionality coming soon
            </p>
          </div>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="flex flex-wrap gap-2 justify-end">
          <button className="px-3 py-2 bg-white border border-gray-300 text-black rounded-lg hover:bg-gray-50 transition shadow-sm">
            Download Records
          </button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm">
            Schedule Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default function PatientRecordsPage() {
  const [patients, setPatients] = useState(mockPatients);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  
  // Filter and sort patients
  useEffect(() => {
    let filtered = [...mockPatients];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(patient => 
        patient.name.toLowerCase().includes(query) ||
        patient.condition.toLowerCase().includes(query) ||
        patient.email.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(patient => patient.status === statusFilter);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });
    
    setPatients(filtered);
  }, [searchQuery, sortField, sortDirection, statusFilter]);
  
  // Handle sort toggle
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Patient Records</h1>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md">
          <FaPlus className="mr-2" /> Add Patient
        </button>
      </div>
      
      <div className="flex-1 flex">
        {/* Patient list panel */}
        <div className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden ${
          selectedPatient && 'hidden md:block'
        } ${selectedPatient ? 'md:w-1/3' : 'w-full'}`}>
          {/* Search and filter controls */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-lg appearance-none text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="critical">Critical</option>
                  </select>
                  <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Table header */}
          <div className="grid grid-cols-12 gap-2 p-3 bg-gray-50 border-b border-gray-200 hidden md:grid">
            <div 
              className="col-span-5 flex items-center cursor-pointer"
              onClick={() => handleSort('name')}
            >
              <span className="font-medium text-sm text-black">Patient Name</span>
              {sortField === 'name' && (
                sortDirection === 'asc' ? <FaSortAmountUp className="ml-1 text-gray-500" size={12} /> : <FaSortAmountDown className="ml-1 text-gray-500" size={12} />
              )}
            </div>
            <div 
              className="col-span-3 flex items-center cursor-pointer"
              onClick={() => handleSort('condition')}
            >
              <span className="font-medium text-sm text-black">Condition</span>
              {sortField === 'condition' && (
                sortDirection === 'asc' ? <FaSortAmountUp className="ml-1 text-gray-500" size={12} /> : <FaSortAmountDown className="ml-1 text-gray-500" size={12} />
              )}
            </div>
            <div 
              className="col-span-2 flex items-center cursor-pointer"
              onClick={() => handleSort('lastVisit')}
            >
              <span className="font-medium text-sm text-black">Last Visit</span>
              {sortField === 'lastVisit' && (
                sortDirection === 'asc' ? <FaSortAmountUp className="ml-1 text-gray-500" size={12} /> : <FaSortAmountDown className="ml-1 text-gray-500" size={12} />
              )}
            </div>
            <div className="col-span-2 flex items-center">
              <span className="font-medium text-sm text-black">Status</span>
            </div>
          </div>
          
          {/* Patient list */}
          <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 270px)' }}>
            {patients.length > 0 ? (
              <div>
                {patients.map(patient => (
                  <div 
                    key={patient.id} 
                    className="border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedPatient(patient)}
                  >
                    {/* Mobile view */}
                    <div className="p-3 md:hidden">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img 
                            src={patient.profileImage} 
                            alt={patient.name} 
                            className="w-10 h-10 rounded-full object-cover shadow-sm"
                          />
                          <div className="ml-3">
                            <h3 className="font-medium text-black">{patient.name}</h3>
                            <p className="text-xs text-black">{patient.age} years • {patient.condition}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <StatusBadge status={patient.status} />
                          <FaChevronRight className="ml-2 text-gray-400" size={12} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Desktop view */}
                    <div className="hidden md:grid grid-cols-12 gap-2 p-3 items-center">
                      <div className="col-span-5 flex items-center">
                        <img 
                          src={patient.profileImage} 
                          alt={patient.name} 
                          className="w-8 h-8 rounded-full object-cover shadow-sm mr-2"
                        />
                        <div>
                          <h3 className="font-medium text-black">{patient.name}</h3>
                          <p className="text-xs text-black">{patient.age} years • {patient.gender}</p>
                        </div>
                      </div>
                      <div className="col-span-3">
                        <p className="text-sm text-black">{patient.condition}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-black">{formatDate(patient.lastVisit)}</p>
                      </div>
                      <div className="col-span-2 flex justify-between items-center">
                        <StatusBadge status={patient.status} />
                        <FaChevronRight className="text-gray-400" size={12} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FaUserCircle className="mx-auto text-gray-300 text-4xl mb-3" />
                <h3 className="text-lg font-medium text-black">No patients found</h3>
                <p className="text-black">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Patient detail panel */}
        {selectedPatient && (
          <div className={`md:ml-4 md:w-2/3 ${!selectedPatient && 'hidden'}`}>
            <PatientDetail 
              patient={selectedPatient}
              onClose={() => setSelectedPatient(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
} 