import React from 'react';
import { Phone } from 'lucide-react';

const RequestCallButton = ({ className = '' }) => {
  return (
    <button 
      className={`bg-[#00A0A0] text-white px-6 py-3 rounded-full flex items-center justify-center hover:bg-[#008080] transition duration-300 ${className}`}
      onClick={() => {
        // Handle button click (open modal, scroll to form, etc.)
        console.log('Request call clicked');
      }}
    >
      <Phone className="w-4 h-4 mr-2" />
      Request a Call
    </button>
  );
};

export default RequestCallButton;
