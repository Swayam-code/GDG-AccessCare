"use client";

import React, { useState, useEffect } from 'react';
import { 
  FaSearch, 
  FaPlus, 
  FaTimes, 
  FaInfoCircle, 
  FaRedo, 
  FaArrowRight,
  FaHospital,
  FaExclamationTriangle,
  FaRegCheckCircle
} from 'react-icons/fa';

// Mock symptoms data
const commonSymptoms = [
  { id: 1, name: 'Fever', selected: false, severity: 'medium' },
  { id: 2, name: 'Cough', selected: false, severity: 'medium' },
  { id: 3, name: 'Fatigue', selected: false, severity: 'medium' },
  { id: 4, name: 'Headache', selected: false, severity: 'medium' },
  { id: 5, name: 'Sore Throat', selected: false, severity: 'medium' },
  { id: 6, name: 'Shortness of Breath', selected: false, severity: 'medium' },
  { id: 7, name: 'Chest Pain', selected: false, severity: 'medium' },
  { id: 8, name: 'Nausea', selected: false, severity: 'medium' },
  { id: 9, name: 'Vomiting', selected: false, severity: 'medium' },
  { id: 10, name: 'Diarrhea', selected: false, severity: 'medium' },
  { id: 11, name: 'Muscle Pain', selected: false, severity: 'medium' },
  { id: 12, name: 'Joint Pain', selected: false, severity: 'medium' },
  { id: 13, name: 'Rash', selected: false, severity: 'medium' },
  { id: 14, name: 'Dizziness', selected: false, severity: 'medium' },
  { id: 15, name: 'Nasal Congestion', selected: false, severity: 'medium' },
  { id: 16, name: 'Runny Nose', selected: false, severity: 'medium' },
  { id: 17, name: 'Loss of Taste', selected: false, severity: 'medium' },
  { id: 18, name: 'Loss of Smell', selected: false, severity: 'medium' },
  { id: 19, name: 'Abdominal Pain', selected: false, severity: 'medium' },
  { id: 20, name: 'Chills', selected: false, severity: 'medium' },
];

// Mock predictions based on symptom combinations
const mockPredictions = {
  'Fever,Cough,Fatigue': [
    { disease: 'Common Cold', confidence: 65, severity: 'mild', description: 'A viral infection of the upper respiratory tract.' },
    { disease: 'Influenza', confidence: 82, severity: 'moderate', description: 'A viral infection that affects the respiratory system.' },
    { disease: 'COVID-19', confidence: 45, severity: 'moderate to severe', description: 'A respiratory illness caused by the SARS-CoV-2 virus.' }
  ],
  'Headache,Fatigue,Nausea': [
    { disease: 'Migraine', confidence: 78, severity: 'moderate', description: 'A severe headache often accompanied by sensitivity to light and sound.' },
    { disease: 'Tension Headache', confidence: 62, severity: 'mild', description: 'A common type of headache characterized by mild to moderate pain.' },
    { disease: 'Caffeine Withdrawal', confidence: 40, severity: 'mild', description: 'Symptoms that appear after stopping regular caffeine consumption.' }
  ],
  'Chest Pain,Shortness of Breath,Fatigue': [
    { disease: 'Asthma Exacerbation', confidence: 68, severity: 'moderate', description: 'A worsening of asthma symptoms.' },
    { disease: 'Bronchitis', confidence: 54, severity: 'moderate', description: 'Inflammation of the lining of the bronchial tubes.' },
    { disease: 'Possible Heart Condition', confidence: 38, severity: 'severe', description: 'Symptoms that could indicate a heart-related issue.' }
  ],
  'default': [
    { disease: 'Common Cold', confidence: 45, severity: 'mild', description: 'A viral infection of the upper respiratory tract.' },
    { disease: 'Seasonal Allergies', confidence: 38, severity: 'mild', description: 'An immune response to environmental allergens.' },
    { disease: 'Viral Infection', confidence: 30, severity: 'moderate', description: 'A general infection caused by a virus.' }
  ]
};

// Severity levels with corresponding colors
const severityLevels = [
  { value: 'mild', label: 'Mild', color: 'bg-green-100 text-green-800 border-green-200' },
  { value: 'medium', label: 'Moderate', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { value: 'severe', label: 'Severe', color: 'bg-red-100 text-red-800 border-red-200' }
];

const SymptomSelector = ({ 
  symptoms,
  selectedSymptoms,
  onSelectSymptom,
  onRemoveSymptom,
  onChangeSeverity,
  searchTerm,
  setSearchTerm
}: { 
  symptoms: any[], 
  selectedSymptoms: any[],
  onSelectSymptom: (symptom: any) => void,
  onRemoveSymptom: (id: number) => void,
  onChangeSeverity: (id: number, severity: string) => void,
  searchTerm: string,
  setSearchTerm: (term: string) => void
}) => {
  // Filter symptoms based on search term
  const filteredSymptoms = symptoms.filter(symptom => 
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedSymptoms.some(s => s.id === symptom.id)
  );

  return (
    <div>
      <div className="relative mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for symptoms..."
          className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
      </div>

      {/* Selected symptoms */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-black mb-2">Selected Symptoms:</h3>
        <div className="flex flex-wrap gap-2">
          {selectedSymptoms.length === 0 ? (
            <p className="text-sm text-gray-500">No symptoms selected yet. Search and select symptoms above.</p>
          ) : (
            selectedSymptoms.map((symptom) => (
              <div 
                key={symptom.id} 
                className="flex items-center bg-white border border-gray-200 rounded-lg p-2 shadow-sm"
              >
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-black mr-2">{symptom.name}</span>
                    <button 
                      onClick={() => onRemoveSymptom(symptom.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                  <div className="flex mt-1">
                    {severityLevels.map((level) => (
                      <button
                        key={level.value}
                        onClick={() => onChangeSeverity(symptom.id, level.value)}
                        className={`text-xs px-2 py-0.5 mr-1 rounded-full ${
                          symptom.severity === level.value 
                            ? level.color
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Symptom suggestions */}
      {searchTerm && filteredSymptoms.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-sm mb-4">
          <h3 className="text-sm font-medium text-black mb-2">Suggested Symptoms:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {filteredSymptoms.slice(0, 9).map((symptom) => (
              <button
                key={symptom.id}
                onClick={() => onSelectSymptom(symptom)}
                className="text-left px-3 py-2 text-sm text-black hover:bg-blue-50 rounded-lg flex items-center"
              >
                <FaPlus className="text-blue-500 mr-2" size={10} />
                {symptom.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Common symptoms */}
      {(!searchTerm || filteredSymptoms.length === 0) && (
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm mb-4">
          <h3 className="text-sm font-medium text-black mb-2">Common Symptoms:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {symptoms
              .filter(s => !selectedSymptoms.some(selected => selected.id === s.id))
              .slice(0, 9)
              .map((symptom) => (
                <button
                  key={symptom.id}
                  onClick={() => onSelectSymptom(symptom)}
                  className="text-left px-3 py-2 text-sm text-black hover:bg-blue-50 rounded-lg flex items-center"
                >
                  <FaPlus className="text-blue-500 mr-2" size={10} />
                  {symptom.name}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

const PredictionResult = ({ 
  predictions, 
  isLoading
}: { 
  predictions: any[] | null, 
  isLoading: boolean
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-black">Analyzing your symptoms...</p>
      </div>
    );
  }

  if (!predictions) {
    return null;
  }

  const getSeverityColor = (severity: string) => {
    if (severity.includes('mild')) return 'bg-green-100 text-green-800';
    if (severity.includes('moderate')) return 'bg-yellow-100 text-yellow-800';
    if (severity.includes('severe')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-black mb-4">Potential Conditions</h3>
      
      <div className="space-y-4">
        {predictions.map((prediction, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex justify-between items-center p-3 bg-blue-50 border-b border-gray-200">
              <h4 className="font-medium text-black">{prediction.disease}</h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  {prediction.confidence}% match
                </span>
                <span className={`text-sm px-2 py-0.5 rounded-full ${getSeverityColor(prediction.severity)}`}>
                  {prediction.severity.charAt(0).toUpperCase() + prediction.severity.slice(1)}
                </span>
              </div>
            </div>
            <div className="p-3">
              <p className="text-black text-sm mb-3">{prediction.description}</p>
              
              {prediction.confidence > 70 && (
                <div className="mt-2">
                  <div className="flex items-start bg-yellow-50 p-2 rounded border border-yellow-200 text-sm">
                    <FaExclamationTriangle className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-black">
                      {prediction.severity.includes('severe') 
                        ? 'Consider seeking medical attention soon.' 
                        : 'Consider consulting with a healthcare professional.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between">
        <a 
          href="/dashboard/patient/appointments" 
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <FaHospital className="mr-2" /> Book Appointment
        </a>
        <a
          href="/dashboard/patient/health-assistant"
          className="inline-flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
        >
          Ask Health Assistant <FaArrowRight className="ml-2" />
        </a>
      </div>
    </div>
  );
};

export default function DiseasePredictor() {
  const [allSymptoms] = useState(commonSymptoms);
  const [selectedSymptoms, setSelectedSymptoms] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [predictions, setPredictions] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectSymptom = (symptom: any) => {
    setSelectedSymptoms([...selectedSymptoms, { ...symptom, selected: true }]);
    setSearchTerm('');
  };

  const handleRemoveSymptom = (id: number) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== id));
  };

  const handleChangeSeverity = (id: number, severity: string) => {
    setSelectedSymptoms(
      selectedSymptoms.map(s => 
        s.id === id ? { ...s, severity } : s
      )
    );
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setPredictions(null);
    setSearchTerm('');
  };

  const handlePredict = () => {
    if (selectedSymptoms.length === 0) return;

    setIsLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const symptomNames = selectedSymptoms.map(s => s.name).sort().join(',');
      
      // Find matching prediction or use default
      let result = mockPredictions[symptomNames as keyof typeof mockPredictions];
      
      // Check for chest pain and shortness of breath combination (higher risk)
      const hasChestPain = selectedSymptoms.some(s => s.name === 'Chest Pain' && s.severity === 'severe');
      const hasBreathingIssue = selectedSymptoms.some(s => s.name === 'Shortness of Breath' && s.severity === 'severe');
      
      if (hasChestPain && hasBreathingIssue) {
        result = [
          { 
            disease: 'Possible Cardiac Issue', 
            confidence: 75, 
            severity: 'severe', 
            description: 'The combination of severe chest pain and shortness of breath may indicate a serious cardiac condition requiring immediate medical attention.' 
          },
          ...mockPredictions.default.slice(0, 2)
        ];
      } else if (!result) {
        result = mockPredictions.default;
      }
      
      setPredictions(result);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black mb-2">Disease Predictor</h1>
        <p className="text-black mb-2">
          Select your symptoms and get an instant prediction using our AI-powered model.
        </p>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm flex items-start">
          <FaInfoCircle className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-black">
            This tool provides preliminary information only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified medical professional.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
            <SymptomSelector
              symptoms={allSymptoms}
              selectedSymptoms={selectedSymptoms}
              onSelectSymptom={handleSelectSymptom}
              onRemoveSymptom={handleRemoveSymptom}
              onChangeSeverity={handleChangeSeverity}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            
            <div className="flex justify-between mt-6">
              <button
                onClick={handleReset}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-black hover:bg-gray-50 transition"
              >
                <FaRedo className="mr-2" /> Reset
              </button>
              <button
                onClick={handlePredict}
                disabled={selectedSymptoms.length === 0}
                className={`inline-flex items-center px-4 py-2 rounded-lg transition ${
                  selectedSymptoms.length === 0
                    ? 'bg-blue-300 cursor-not-allowed text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Predict Illness
              </button>
            </div>
          </div>

          {/* Basic guidance */}
          {!predictions && !isLoading && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <h3 className="text-lg font-semibold text-black mb-2">How To Use</h3>
              <ol className="text-black text-sm space-y-2">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center font-medium mr-2 flex-shrink-0">1</span>
                  <span>Search and select all symptoms you're experiencing</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center font-medium mr-2 flex-shrink-0">2</span>
                  <span>Set severity level for each symptom (mild, moderate, severe)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center font-medium mr-2 flex-shrink-0">3</span>
                  <span>Click "Predict Illness" to get AI-powered analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center font-medium mr-2 flex-shrink-0">4</span>
                  <span>Review potential conditions and recommended actions</span>
                </li>
              </ol>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          {(predictions || isLoading) && (
            <PredictionResult predictions={predictions} isLoading={isLoading} />
          )}
          
          {!predictions && !isLoading && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <h3 className="text-lg font-semibold text-black mb-3">For Emergencies</h3>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-black text-sm mb-2">
                  <span className="font-medium">If you experience any of these symptoms, seek immediate medical attention:</span>
                </p>
                <ul className="text-black text-sm space-y-1">
                  <li>• Severe chest pain or pressure</li>
                  <li>• Difficulty breathing or shortness of breath</li>
                  <li>• Sudden severe headache</li>
                  <li>• Sudden numbness or weakness</li>
                  <li>• Severe abdominal pain</li>
                </ul>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h4 className="font-medium text-black mb-2">Why Use This Tool?</h4>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <FaRegCheckCircle className="text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-black">Get preliminary insights about your symptoms</p>
                  </div>
                  <div className="flex items-start">
                    <FaRegCheckCircle className="text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-black">Better prepare for your doctor's appointment</p>
                  </div>
                  <div className="flex items-start">
                    <FaRegCheckCircle className="text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-black">Learn about possible conditions related to your symptoms</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 