import React from 'react';
import { motion } from 'framer-motion';

const HowItWorksCard = () => {
  const steps = [
    {
      title: "Upload File",
      description: "Drag & drop your Excel/CSV file or click to browse",
    },
    {
      title: "Process Data",
      description: "System extracts consignments and fetches tracking data",
    },
    {
      title: "Get Results",
      description: "View tracking details with PDF links & screenshots",
    },
  ];

  const fileTypes = ['.xlsx', '.xls', '.csv'];
  const columnNames = ['Consignment No', 'Tracking ID', 'AWB Number', 'Barcode'];

  return (
    <motion.div 
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-5">
        <motion.h2 
          className="text-xl font-bold text-white flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          How It Works
        </motion.h2>
      </div>
      
      <div className="p-5">
        {/* Steps with staggered animations */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Simple 3-Step Process
          </h3>
          
          <div className="space-y-5">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <div className="flex-shrink-0 mt-1 mr-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{step.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Supported formats with animation */}
        <motion.div 
          className="pt-5 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Supported Formats
          </h4>
          <div className="flex flex-wrap gap-2">
            {fileTypes.map((format, index) => (
              <motion.span 
                key={format}
                className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: 0.7 + index * 0.1,
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
              >
                {format}
              </motion.span>
            ))}
          </div>
        </motion.div>
        
        {/* Column tips with hover animation */}
        <motion.div 
          className="pt-5 mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Column Name Tips
          </h4>
          <p className="text-gray-600 text-sm mb-3">
            Use these common names for best results:
          </p>
          <div className="flex flex-wrap gap-2">
            {columnNames.map((name) => (
              <motion.span 
                key={name}
                className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-lg text-sm cursor-default transition-all hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HowItWorksCard;