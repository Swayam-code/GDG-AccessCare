"use client";

import React, { useState } from 'react';

type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all duration-300 mb-4">
      <button
        className="flex justify-between items-center w-full px-6 py-5 text-left font-medium text-gray-800 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold">{question}</span>
        <div className={`bg-blue-50 rounded-full p-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div 
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

export const FAQ = () => {
  const faqs = [
    {
      question: "How does AccessCare work without internet?",
      answer: "AccessCare offers multiple connectivity options. In areas with limited internet, our Progressive Web App works offline and syncs when connectivity returns. For areas with no internet, we offer SMS-based consultations and an SMS symptom checker that works on basic feature phones.",
    },
    {
      question: "Are the doctors on AccessCare qualified?",
      answer: "Yes, all healthcare providers on our platform are licensed and certified. We verify their credentials and provide additional training in telemedicine and rural healthcare challenges to ensure quality care delivery.",
    },
    {
      question: "How can I get medications after consultation?",
      answer: "After your consultation, if medication is prescribed, you can either download the prescription for local purchase or use our partner pharmacy network that delivers to rural areas. For certain regions, we have partnerships with local health workers who can deliver essential medications.",
    },
    {
      question: "Is my health information secure?",
      answer: "Yes, we take data security very seriously. All health information is encrypted and stored securely following international privacy standards. You have complete control over your data, and we never share it with third parties without your explicit consent.",
    },
    {
      question: "What languages are supported?",
      answer: "Our platform supports multiple languages including English, Hindi, Spanish, Swahili, and more. Our AI chatbot can communicate in several local languages and dialects to ensure healthcare guidance is accessible to everyone.",
    },
    {
      question: "How much does it cost to use AccessCare?",
      answer: "We offer a tiered pricing model. Basic health information and the symptom checker are free. Consultations are affordably priced based on regional income levels, and we partner with local NGOs to provide subsidized or free care for those who cannot afford it.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-white to-blue-50 relative">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-blue-100 rounded-full opacity-50 animate-float"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-indigo-100 rounded-full opacity-50 animate-float-delay"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="bg-blue-100 text-blue-800 rounded-full px-4 py-1 text-sm font-semibold tracking-wide uppercase mb-4 inline-block">Got Questions?</span>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl mb-6">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about AccessCare and our services. If you need further assistance, our support team is just a click away.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>

        <div className="mt-16 text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Still have questions?</h3>
          <p className="text-gray-600 mb-6">Our support team is ready to help you with any questions or concerns.</p>
          <a 
            href="#contact" 
            className="inline-flex items-center px-8 py-4 border border-transparent text-base font-semibold rounded-full shadow-md text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ; 