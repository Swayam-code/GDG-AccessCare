"use client";

import React, { useState } from 'react';
import { 
  FaFileMedical, 
  FaDownload, 
  FaEye, 
  FaShare, 
  FaSearch,
  FaFilter,
  FaCalendarAlt
} from 'react-icons/fa';

// Mock data for medical records
const medicalRecords = [
  {
    id: 1,
    title: 'General Health Checkup',
    doctor: 'Dr. Sarah Johnson',
    specialty: 'General Medicine',
    date: '2023-09-15',
    type: 'Report',
    status: 'Final',
    fileSize: '1.2 MB',
    fileType: 'PDF',
  },
  {
    id: 2,
    title: 'Cardiology Assessment',
    doctor: 'Dr. Michael Rodriguez',
    specialty: 'Cardiology',
    date: '2023-08-22',
    type: 'Report',
    status: 'Final',
    fileSize: '2.5 MB',
    fileType: 'PDF',
  },
  {
    id: 3,
    title: 'Blood Test Results',
    doctor: 'Dr. Emily Chen',
    specialty: 'Hematology',
    date: '2023-07-10',
    type: 'Lab Results',
    status: 'Final',
    fileSize: '0.8 MB',
    fileType: 'PDF',
  },
  {
    id: 4,
    title: 'X-Ray - Chest',
    doctor: 'Dr. David Kim',
    specialty: 'Radiology',
    date: '2023-06-18',
    type: 'Imaging',
    status: 'Final',
    fileSize: '3.1 MB',
    fileType: 'DICOM',
  },
  {
    id: 5,
    title: 'Prescription',
    doctor: 'Dr. Sarah Johnson',
    specialty: 'General Medicine',
    date: '2023-05-12',
    type: 'Prescription',
    status: 'Active',
    fileSize: '0.5 MB',
    fileType: 'PDF',
  },
];

// Record card component
const RecordCard = ({ record }: { record: any }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'report':
        return 'bg-blue-100 text-blue-600';
      case 'lab results':
        return 'bg-purple-100 text-purple-600';
      case 'imaging':
        return 'bg-green-100 text-green-600';
      case 'prescription':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4">
          <div className="flex items-center mb-3">
            <div className={`p-2 rounded-md ${getTypeIcon(record.type)}`}>
              <FaFileMedical />
            </div>
            <div className="ml-4">
              <h3 className="font-semibold text-gray-800">{record.title}</h3>
              <p className="text-sm text-gray-600">{record.doctor} • {record.specialty}</p>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <FaCalendarAlt className="mr-2" />
            <span>{formatDate(record.date)}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-md">
              {record.type}
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-md">
              {record.status}
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-md">
              {record.fileType}
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-md">
              {record.fileSize}
            </span>
          </div>
          
          <div className="flex justify-between pt-2 border-t border-gray-100">
            <button 
              onClick={() => setIsPreviewOpen(true)}
              className="text-sm text-blue-600 flex items-center hover:text-blue-800"
            >
              <FaEye className="mr-1" /> View
            </button>
            <button className="text-sm text-blue-600 flex items-center hover:text-blue-800">
              <FaDownload className="mr-1" /> Download
            </button>
            <button className="text-sm text-blue-600 flex items-center hover:text-blue-800">
              <FaShare className="mr-1" /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Document Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">{record.title}</h3>
              <button 
                onClick={() => setIsPreviewOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="p-1 flex-grow overflow-auto">
              {record.type === 'Imaging' ? (
                <div className="flex items-center justify-center h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1559757175-7cb057fba628?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" 
                    alt="X-Ray Preview" 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <div className="bg-gray-50 p-6 min-h-96 flex items-center justify-center">
                  <p className="text-gray-500">Document preview would appear here</p>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-between">
              <div className="text-sm text-gray-600">
                Uploaded on {formatDate(record.date)} • {record.fileSize} • {record.fileType}
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 flex items-center">
                  <FaDownload className="mr-1" /> Download
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center">
                  <FaShare className="mr-1" /> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Filter dropdown component
const FilterDropdown = ({ 
  isOpen, 
  toggle, 
  filters, 
  setFilters 
}: { 
  isOpen: boolean; 
  toggle: () => void; 
  filters: any; 
  setFilters: (filters: any) => void 
}) => {
  const recordTypes = ['All Types', 'Report', 'Lab Results', 'Imaging', 'Prescription'];
  const dateRanges = ['All Time', 'Last 30 Days', 'Last 3 Months', 'Last Year'];
  
  return (
    <div className="relative">
      <button 
        onClick={toggle}
        className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
      >
        <FaFilter className="mr-2 text-gray-500" />
        <span>Filter</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          <div className="p-4">
            <h3 className="font-medium text-gray-800 mb-3">Filter Records</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Record Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {recordTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {dateRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-between pt-3 border-t border-gray-200">
              <button 
                onClick={() => setFilters({ type: 'All Types', dateRange: 'All Time' })}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Reset
              </button>
              <button 
                onClick={toggle}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Upload record modal
const UploadRecordModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const recordTypes = ['Report', 'Lab Results', 'Imaging', 'Prescription', 'Other'];
  
  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Upload Medical Record</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="p-6">
          <form>
            <div className="space-y-4">
              <div>
                <label htmlFor="record-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Record Title
                </label>
                <input
                  type="text"
                  id="record-title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Blood Test Results"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="record-type" className="block text-sm font-medium text-gray-700 mb-1">
                  Record Type
                </label>
                <select
                  id="record-type"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a type</option>
                  {recordTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="record-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Record Date
                </label>
                <input
                  type="date"
                  id="record-date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="doctor-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor Name
                </label>
                <input
                  type="text"
                  id="doctor-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Dr. Sarah Johnson"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload File
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, JPEG, PNG up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};

// Main component for Medical Records page
export default function MedicalRecordsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: 'All Types',
    dateRange: 'All Time',
  });
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Filter records based on search query and filters
  const filteredRecords = medicalRecords.filter((record) => {
    // Search filter
    if (
      searchQuery &&
      !record.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !record.type.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    // Type filter
    if (filters.type !== 'All Types' && record.type !== filters.type) {
      return false;
    }
    
    // Date filter logic would go here
    
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Medical Records</h1>
        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <FaFileMedical className="mr-2" /> Upload Record
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <FilterDropdown 
          isOpen={isFilterOpen} 
          toggle={() => setIsFilterOpen(!isFilterOpen)} 
          filters={filters} 
          setFilters={setFilters} 
        />
      </div>

      {filteredRecords.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredRecords.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <FaFileMedical className="text-gray-400 text-xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No records found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || filters.type !== 'All Types'
              ? 'Try adjusting your search or filter criteria'
              : 'Upload your medical records to keep track of your health history'}
          </p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Upload your first record
          </button>
        </div>
      )}

      {/* Upload Record Modal */}
      <UploadRecordModal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} />
    </div>
  );
} 