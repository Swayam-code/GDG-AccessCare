"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  FaUserCircle,
  FaBars,
  FaTimes,
  FaHome,
  FaCalendarAlt,
  FaFileMedical,
  FaVideo,
  FaBook,
  FaRobot,
  FaSignOutAlt,
  FaChevronRight,
  FaChartLine
} from 'react-icons/fa';

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarLink = ({ href, icon, label, isActive }: SidebarLinkProps) => {
  return (
    <Link href={href} className={`flex items-center px-4 py-3 rounded-lg mb-1 transition-all duration-200 ${
      isActive 
        ? 'bg-blue-600 text-white font-medium shadow-md' 
        : 'hover:bg-blue-50 text-black'
    }`}>
      <div className={`mr-3 text-xl ${isActive ? 'text-white' : 'text-blue-500'}`}>
        {icon}
      </div>
      <span className="text-sm">{label}</span>
      {isActive && (
        <FaChevronRight className="ml-auto text-xs" />
      )}
    </Link>
  );
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isPatientRoute = pathname.includes('/dashboard/patient');
  const isDoctorRoute = pathname.includes('/dashboard/doctor');
  
  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Only add listener if menu is open
    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleSidebarToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling
    setIsMenuOpen(!isMenuOpen);
  };

  const getPatientLinks = () => [
    {
      href: '/dashboard/patient',
      icon: <FaHome />,
      label: 'Dashboard',
      isActive: pathname === '/dashboard/patient',
    },
    {
      href: '/dashboard/patient/appointments',
      icon: <FaCalendarAlt />,
      label: 'Appointments',
      isActive: pathname === '/dashboard/patient/appointments',
    },
    {
      href: '/dashboard/patient/teleconsultation',
      icon: <FaVideo />,
      label: 'Teleconsultation',
      isActive: pathname === '/dashboard/patient/teleconsultation',
    },
    {
      href: '/dashboard/patient/disease-predictor',
      icon: <FaChartLine />,
      label: 'Disease Predictor',
      isActive: pathname === '/dashboard/patient/disease-predictor',
    },
    {
      href: '/dashboard/patient/medical-records',
      icon: <FaFileMedical />,
      label: 'Medical Records',
      isActive: pathname === '/dashboard/patient/medical-records',
    },
    {
      href: '/dashboard/patient/education',
      icon: <FaBook />,
      label: 'Education',
      isActive: pathname === '/dashboard/patient/education',
    },
    {
      href: '/dashboard/patient/health-assistant',
      icon: <FaRobot />,
      label: 'Health Assistant',
      isActive: pathname === '/dashboard/patient/health-assistant',
    },
    {
      href: '/dashboard/patient/profile',
      icon: <FaUserCircle />,
      label: 'My Profile',
      isActive: pathname === '/dashboard/patient/profile',
    },
  ];

  const getDoctorLinks = () => [
    {
      href: '/dashboard/doctor',
      icon: <FaHome />,
      label: 'Dashboard',
      isActive: pathname === '/dashboard/doctor',
    },
    {
      href: '/dashboard/doctor/appointments',
      icon: <FaCalendarAlt />,
      label: 'Appointments',
      isActive: pathname === '/dashboard/doctor/appointments',
    },
    {
      href: '/dashboard/doctor/patients',
      icon: <FaUserCircle />,
      label: 'My Patients',
      isActive: pathname === '/dashboard/doctor/patients',
    },
    {
      href: '/dashboard/doctor/teleconsultation',
      icon: <FaVideo />,
      label: 'Video Calls',
      isActive: pathname === '/dashboard/doctor/teleconsultation',
    },
    {
      href: '/dashboard/doctor/prescriptions',
      icon: <FaFileMedical />,
      label: 'Prescriptions',
      isActive: pathname === '/dashboard/doctor/prescriptions',
    },
    {
      href: '/dashboard/doctor/profile',
      icon: <FaUserCircle />,
      label: 'Profile',
      isActive: pathname === '/dashboard/doctor/profile',
    },
  ];

  const navLinks = isPatientRoute ? getPatientLinks() : getDoctorLinks();
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:w-72 bg-white border-r border-blue-100 flex-col">
        <div className="p-6 border-b border-blue-100">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl mr-3">
              {isPatientRoute ? "P" : "D"}
            </div>
            <div>
              <p className="text-lg font-bold text-black">
                {isPatientRoute ? "John Doe" : "Dr. Sarah Johnson"}
              </p>
              <p className="text-sm text-black">
                {isPatientRoute ? "Patient" : "Cardiologist"}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-1 mb-6">
            {navLinks.map((link) => (
              <SidebarLink
                key={link.href}
                href={link.href}
                icon={link.icon}
                label={link.label}
                isActive={link.isActive}
              />
            ))}
          </div>
        </div>
        
        <div className="px-4 py-4 border-t border-blue-100">
          <Link href="/login" className="flex items-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50">
            <div className="mr-3 text-xl">
              <FaSignOutAlt />
            </div>
            <span className="text-sm">Logout</span>
          </Link>
        </div>
      </aside>
      
      {/* Mobile sidebar overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      
      {/* Sidebar - Mobile */}
      <aside 
        className={`md:hidden fixed inset-y-0 left-0 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-blue-100 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl mr-3">
              {isPatientRoute ? "P" : "D"}
            </div>
            <div>
              <p className="text-sm font-bold text-black">
                {isPatientRoute ? "John Doe" : "Dr. Sarah Johnson"}
              </p>
              <p className="text-xs text-black">
                {isPatientRoute ? "Patient" : "Cardiologist"}
              </p>
            </div>
          </div>
          <button
            onClick={handleSidebarToggle}
            className="text-black hover:text-blue-600"
          >
            <FaTimes size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-1 mb-6">
            {navLinks.map((link) => (
              <SidebarLink
                key={link.href}
                href={link.href}
                icon={link.icon}
                label={link.label}
                isActive={link.isActive}
              />
            ))}
          </div>
        </div>
        
        <div className="px-4 py-4 border-t border-blue-100">
          <Link href="/login" className="flex items-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50">
            <div className="mr-3 text-xl">
              <FaSignOutAlt />
            </div>
            <span className="text-sm">Logout</span>
          </Link>
        </div>
      </aside>
      
      {/* Mobile menu toggle button */}
      <div className="md:hidden fixed bottom-6 right-6 z-20">
        <button
          onClick={handleSidebarToggle}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <FaBars size={24} />
        </button>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 