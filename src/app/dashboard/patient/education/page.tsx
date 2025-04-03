"use client";

import React, { useState } from 'react';
import { 
  FaSearch, 
  FaBookReader, 
  FaVideo, 
  FaFilePdf,
  FaCaretRight,
  FaBookmark,
  FaPlay
} from 'react-icons/fa';

// Mock data for educational content
const educationalContent = [
  {
    id: 1,
    type: 'article',
    title: 'Understanding Blood Pressure Readings',
    category: 'Heart Health',
    description: 'Learn what your blood pressure numbers mean and what healthy levels look like.',
    readTime: '5 min read',
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
    isBookmarked: false,
  },
  {
    id: 2,
    type: 'video',
    title: 'How to Manage Diabetes Through Diet',
    category: 'Diabetes',
    description: 'Expert nutritionists explain the best dietary approaches for diabetes management.',
    duration: '12 min',
    thumbnail: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
    isBookmarked: true,
  },
  {
    id: 3,
    type: 'article',
    title: 'The Importance of Regular Exercise',
    category: 'Fitness',
    description: 'Discover how regular physical activity can improve your health and well-being.',
    readTime: '8 min read',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
    isBookmarked: false,
  },
  {
    id: 4,
    type: 'pdf',
    title: 'Mental Health Self-Care Guide',
    category: 'Mental Health',
    description: 'A comprehensive guide to maintaining good mental health through self-care practices.',
    pageCount: '15 pages',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
    isBookmarked: false,
  },
  {
    id: 5,
    type: 'video',
    title: 'Understanding Vaccinations',
    category: 'Preventive Care',
    description: 'Learn how vaccines work and why they are important for public health.',
    duration: '18 min',
    thumbnail: 'https://images.unsplash.com/photo-1584277261846-c6a1672ed979?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
    isBookmarked: false,
  },
  {
    id: 6,
    type: 'article',
    title: 'Nutrition Basics: Building a Balanced Diet',
    category: 'Nutrition',
    description: 'Understanding macro and micronutrients, and how to create a balanced meal plan.',
    readTime: '10 min read',
    thumbnail: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
    isBookmarked: true,
  },
];

// Categories for filtering
const categories = [
  'All Categories',
  'Heart Health',
  'Diabetes',
  'Fitness',
  'Mental Health',
  'Preventive Care',
  'Nutrition',
  'Women\'s Health',
  'Men\'s Health',
];

// Content types for filtering
const contentTypes = [
  'All Types',
  'Articles',
  'Videos',
  'PDFs',
];

// Content card component
const ContentCard = ({ content, onToggleBookmark }: { content: any, onToggleBookmark: (id: number) => void }) => {
  const getTypeIcon = () => {
    switch (content.type) {
      case 'article':
        return <FaBookReader className="text-blue-500" />;
      case 'video':
        return <FaVideo className="text-red-500" />;
      case 'pdf':
        return <FaFilePdf className="text-orange-500" />;
      default:
        return <FaBookReader className="text-blue-500" />;
    }
  };

  const getDuration = () => {
    if (content.type === 'article') return content.readTime;
    if (content.type === 'video') return content.duration;
    if (content.type === 'pdf') return content.pageCount;
    return '';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={content.thumbnail} 
          alt={content.title} 
          className="w-full h-48 object-cover"
        />
        <button 
          onClick={() => onToggleBookmark(content.id)}
          className={`absolute top-2 right-2 p-2 rounded-full ${content.isBookmarked ? 'bg-yellow-100 text-yellow-500' : 'bg-white bg-opacity-75 text-gray-600'}`}
        >
          <FaBookmark />
        </button>
        {content.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-50 rounded-full p-3">
              <FaPlay className="text-white text-xl" />
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full flex items-center">
            {getTypeIcon()}
            <span className="ml-1 capitalize">{content.type}</span>
          </span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm text-gray-500">{getDuration()}</span>
        </div>
        <h3 className="font-semibold text-gray-800 mb-1">{content.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{content.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
            {content.category}
          </span>
          <button className="text-blue-600 text-sm flex items-center hover:text-blue-800">
            Read More <FaCaretRight className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Education component
export default function EducationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedType, setSelectedType] = useState('All Types');
  const [content, setContent] = useState(educationalContent);
  
  // Filter content based on search, category, and type
  const filteredContent = content.filter((item) => {
    // Search filter
    if (
      searchQuery &&
      !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.category.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    // Category filter
    if (selectedCategory !== 'All Categories' && item.category !== selectedCategory) {
      return false;
    }
    
    // Type filter
    if (selectedType === 'Articles' && item.type !== 'article') return false;
    if (selectedType === 'Videos' && item.type !== 'video') return false;
    if (selectedType === 'PDFs' && item.type !== 'pdf') return false;
    
    return true;
  });
  
  // Toggle bookmark status
  const handleToggleBookmark = (id: number) => {
    setContent(content.map(item => 
      item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Health Education</h1>
      </div>

      {/* Search and filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search for health topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {contentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured content */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Featured Health Topics</h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredContent.length > 0 ? (
            filteredContent.map((item) => (
              <ContentCard 
                key={item.id} 
                content={item}
                onToggleBookmark={handleToggleBookmark}
              />
            ))
          ) : (
            <div className="col-span-full p-8 bg-gray-50 rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <FaBookReader className="text-gray-400 text-xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No content found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Health playlists */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Health Playlists</h2>
          <button className="text-blue-600 text-sm hover:text-blue-800">
            View All
          </button>
        </div>
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
          {/* Playlist cards */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-4">
            <h3 className="font-semibold mb-1">Diabetes Management</h3>
            <p className="text-sm text-blue-100 mb-3">5 videos • 3 articles</p>
            <button className="bg-white text-blue-600 px-3 py-1 rounded-md text-sm hover:bg-blue-50 transition">
              Start Learning
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg p-4">
            <h3 className="font-semibold mb-1">Heart Health Basics</h3>
            <p className="text-sm text-purple-100 mb-3">4 videos • 6 articles</p>
            <button className="bg-white text-purple-600 px-3 py-1 rounded-md text-sm hover:bg-purple-50 transition">
              Start Learning
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg p-4">
            <h3 className="font-semibold mb-1">Mental Wellness</h3>
            <p className="text-sm text-green-100 mb-3">7 videos • 4 articles</p>
            <button className="bg-white text-green-600 px-3 py-1 rounded-md text-sm hover:bg-green-50 transition">
              Start Learning
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-4">
            <h3 className="font-semibold mb-1">Nutrition Fundamentals</h3>
            <p className="text-sm text-orange-100 mb-3">6 videos • 8 articles</p>
            <button className="bg-white text-orange-600 px-3 py-1 rounded-md text-sm hover:bg-orange-50 transition">
              Start Learning
            </button>
          </div>
        </div>
      </div>
      
      {/* Newly added content */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recently Added</h2>
          <button className="text-blue-600 text-sm hover:text-blue-800">
            View All
          </button>
        </div>
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex">
            <img 
              src="https://images.unsplash.com/photo-1536064479547-7ee40b74b807?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" 
              alt="Sleep hygiene" 
              className="w-24 h-24 object-cover"
            />
            <div className="p-3 flex-1">
              <div className="flex items-center text-xs text-gray-500 mb-1">
                <FaBookReader className="text-blue-500 mr-1" />
                <span>Article • 7 min read</span>
              </div>
              <h3 className="font-medium text-gray-800 text-sm">Improving Your Sleep Hygiene</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  Mental Health
                </span>
                <button className="text-blue-600 text-xs flex items-center hover:text-blue-800">
                  Read <FaCaretRight className="ml-0.5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex">
            <img 
              src="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" 
              alt="Anti-inflammatory diet" 
              className="w-24 h-24 object-cover"
            />
            <div className="p-3 flex-1">
              <div className="flex items-center text-xs text-gray-500 mb-1">
                <FaVideo className="text-red-500 mr-1" />
                <span>Video • 15 min</span>
              </div>
              <h3 className="font-medium text-gray-800 text-sm">Anti-inflammatory Foods and Their Benefits</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  Nutrition
                </span>
                <button className="text-blue-600 text-xs flex items-center hover:text-blue-800">
                  Watch <FaCaretRight className="ml-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="font-semibold text-blue-800 mb-2">Need personalized health guidance?</h3>
        <p className="text-sm text-blue-700 mb-3">
          Our healthcare professionals can create a customized education plan for your specific health needs.
        </p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition">
          Request Custom Plan
        </button>
      </div>
    </div>
  );
} 