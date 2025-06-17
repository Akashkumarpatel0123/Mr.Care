import React from 'react';
import { motion } from 'framer-motion';

const ServiceHeader = ({ 
  title, 
  description, 
  icon = '🏥', 
  priceRange,
  rating,
  duration 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm overflow-hidden"
    >
      <div className="px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left side - Service Info */}
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{icon}</span>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {title}
              </h1>
            </div>
            
            <p className="mt-4 text-lg text-gray-600 max-w-3xl">
              {description}
            </p>
            
            {/* Meta information */}
            <div className="mt-6 flex flex-wrap gap-4">
              {priceRange && (
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700 font-medium">{priceRange}</span>
                </div>
              )}
              
              {rating && (
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-yellow-500 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-700 font-medium">{rating} (50+ reviews)</span>
                </div>
              )}
              
              {duration && (
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700 font-medium">{duration} avg. duration</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Right side - CTA (optional) */}
          <div className="md:text-right">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors duration-200">
              Book Now
            </button>
            <p className="mt-2 text-sm text-gray-500">
              Available 24/7 • Certified professionals
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceHeader;