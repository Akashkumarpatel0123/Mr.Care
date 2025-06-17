import React from 'react';

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative group">
        {/* Floating button with animation */}
        <button
          onClick={() => window.open('https://wa.me/7903268015', '_blank')}
          className="bg-[#25D366] text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center animate-bounce hover:animate-none"
          aria-label="Contact via WhatsApp"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <path fillRule="evenodd" clipRule="evenodd" d="M20.5 3.5C18.25 1.25 15.25 0 12 0C5.4 0 0 5.4 0 12C0 15.2 1.25 18.2 3.5 20.5L0 24L7.5 20.5C9.75 22.75 12.75 24 16 24C22.6 24 28 18.6 28 12C28 8.8 26.75 5.8 24.5 3.5C22.25 1.25 19.25 0 16 0H12C8.8 0 5.8 1.25 3.5 3.5C1.25 5.75 0 8.75 0 12C0 18.6 5.4 24 12 24C15.2 24 18.2 22.75 20.5 20.5C22.75 18.25 24 15.25 24 12C24 5.4 18.6 0 12 0C5.4 0 0 5.4 0 12C0 15.2 1.25 18.2 3.5 20.5L0 24L7.5 20.5C9.75 22.75 12.75 24 16 24C22.6 24 28 18.6 28 12C28 8.8 26.75 5.8 24.5 3.5ZM12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22ZM17 13.5C16.8 13.3 15.5 12.7 15.3 12.6C15.1 12.5 14.9 12.5 14.7 12.7C14.5 12.9 14 13.5 13.8 13.7C13.6 13.9 13.4 13.9 13.2 13.8C13 13.7 12.1 13.5 11 12.6C10.2 11.9 9.6 11 9.4 10.8C9.2 10.6 9.4 10.4 9.5 10.3C9.6 10.2 9.8 10 9.9 9.8C10 9.6 10.1 9.5 10.2 9.3C10.3 9.1 10.3 8.9 10.2 8.8C10.1 8.7 9.6 7.3 9.3 6.8C9 6.3 8.7 6.4 8.5 6.4C8.3 6.4 8.1 6.4 7.9 6.4C7.7 6.4 7.4 6.4 7.1 6.7C6.8 7 6 7.7 6 9C6 10.3 7 11.6 7.1 11.8C7.2 12 9.3 15.3 12.5 16.4C15.7 17.5 15.7 17.2 16.2 17.1C16.7 17 17.8 16.5 18.1 15.9C18.4 15.3 18.4 14.9 18.3 14.8C18.2 14.7 18 14.6 17.8 14.5L17 13.5Z" fill="currentColor"/>
          </svg>
        </button>

        {/* Tooltip/text that appears on hover */}
        <div className="absolute right-16 bottom-2 bg-gray-800 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Chat with us
          <div className="absolute right-[-4px] top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>

        {/* Optional: Unread notification badge */}
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          1
        </div>
      </div>
    </div>
  );
};

export default WhatsAppButton;