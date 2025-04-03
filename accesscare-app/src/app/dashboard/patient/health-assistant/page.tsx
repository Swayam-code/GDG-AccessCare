"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  FaRobot, 
  FaUser, 
  FaPaperPlane, 
  FaSpinner,
  FaInfoCircle
} from 'react-icons/fa';

// Define types for messages and suggestions
type MessageType = {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

type SuggestionType = {
  id: string;
  text: string;
};

// Sample suggested queries
const suggestedQueries: SuggestionType[] = [
  { id: '1', text: 'What are common symptoms of the flu?' },
  { id: '2', text: 'How can I manage my allergies?' },
  { id: '3', text: 'What should I do for a headache?' },
  { id: '4', text: 'How much water should I drink daily?' },
  { id: '5', text: 'Tips for better sleep' },
  { id: '6', text: 'What causes high blood pressure?' },
];

// Initial welcome message
const initialMessages: MessageType[] = [
  {
    id: '0',
    text: 'Hello! I\'m your health assistant. I can answer general health questions and provide guidance. How can I help you today?',
    sender: 'assistant',
    timestamp: new Date(),
  },
];

// Component for individual message
const Message = ({ message }: { message: MessageType }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
          isUser ? 'bg-blue-600 ml-3' : 'bg-gray-200 mr-3'
        }`}>
          {isUser ? <FaUser className="text-white" /> : <FaRobot className="text-blue-600" />}
        </div>
        <div className={`py-3 px-4 rounded-lg ${
          isUser 
            ? 'bg-blue-600 text-white rounded-tr-none' 
            : 'bg-white border border-gray-200 text-black rounded-tl-none shadow-sm'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
          <p className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
};

// Component for suggestion chips
const SuggestionChips = ({ 
  suggestions, 
  onSelect 
}: { 
  suggestions: SuggestionType[], 
  onSelect: (text: string) => void 
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          onClick={() => onSelect(suggestion.text)}
          className="bg-white border border-gray-200 hover:border-blue-500 text-sm text-black py-2 px-4 rounded-full shadow-sm hover:shadow transition-all"
        >
          {suggestion.text}
        </button>
      ))}
    </div>
  );
};

export default function HealthAssistantPage() {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock function to simulate AI response
  const generateResponse = async (userMessage: string): Promise<string> => {
    // This would be replaced with actual API call in production
    return new Promise((resolve) => {
      // Simulate response generation delay
      setTimeout(() => {
        const responses = [
          `Based on what you've described, this could be related to several conditions. It's always best to consult with a healthcare provider for a proper diagnosis, but I can offer some general information.`,
          `That's a common concern! Here's what you should know: ${userMessage.toLowerCase().includes('headache') ? 'For headaches, make sure you\'re hydrated and consider resting in a dark, quiet room. Over-the-counter pain relievers may help.' : 'Make sure to maintain a healthy lifestyle with regular exercise, balanced diet, and adequate sleep.'}`,
          `Thank you for your question. While I can provide general health information, remember I'm not a substitute for professional medical advice. ${userMessage.toLowerCase().includes('emergency') ? 'If you\'re experiencing an emergency, please call emergency services immediately.' : 'Consider discussing your concerns with your doctor at your next appointment.'}`,
          `Great question! The current health guidelines suggest ${userMessage.toLowerCase().includes('water') ? 'drinking about 8 glasses (64 ounces) of water daily, but individual needs may vary based on activity level, climate, and overall health.' : 'maintaining a balanced diet rich in fruits, vegetables, whole grains, and lean proteins while limiting processed foods and added sugars.'}`,
        ];
        
        const randomIndex = Math.floor(Math.random() * responses.length);
        resolve(responses[randomIndex]);
      }, 1500); // 1.5 second delay
    });
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    setShowSuggestions(false);
    
    // Generate and add AI response
    try {
      const responseText = await generateResponse(inputText);
      const assistantMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Add error message
      const errorMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again later.',
        sender: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionSelect = (text: string) => {
    setInputText(text);
    setShowSuggestions(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black mb-2">Health Assistant</h1>
        <p className="text-black">Ask health-related questions and get AI-powered guidance</p>
      </div>
      
      <div className="flex-1 flex flex-col bg-gray-50 rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        {/* Message display area */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <div className="flex w-full mb-4 justify-start">
              <div className="flex flex-row">
                <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-gray-200 mr-3">
                  <FaRobot className="text-blue-600" />
                </div>
                <div className="py-3 px-4 rounded-lg bg-white border border-gray-200 text-black rounded-tl-none">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Suggestions area */}
        {showSuggestions && messages.length === 1 && (
          <div className="px-4 py-3 border-t border-gray-200 bg-white">
            <p className="text-sm text-black mb-2 font-medium">Suggested questions:</p>
            <SuggestionChips 
              suggestions={suggestedQueries} 
              onSelect={handleSuggestionSelect} 
            />
          </div>
        )}
        
        {/* Disclaimer */}
        <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
          <div className="flex items-center text-xs text-blue-700">
            <FaInfoCircle className="mr-2 flex-shrink-0" />
            <p>This assistant provides general health information only and is not a substitute for professional medical advice.</p>
          </div>
        </div>
        
        {/* Input area */}
        <div className="px-4 py-3 border-t border-gray-200 bg-white">
          <div className="flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your health question here..."
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className={`ml-2 p-2 rounded-full ${
                !inputText.trim() || isTyping
                  ? 'bg-gray-200 text-gray-400'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } transition-colors`}
            >
              {isTyping ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 