import React, { useState } from 'react';
import { Phone, ChevronDown } from 'lucide-react';

const categories = [
  { value: 'nursing', label: 'Nursing' },
  { value: 'physiotherapy', label: 'Physiotherapy' },
  { value: 'consultation', label: 'Doctor Consultation' },
  { value: 'equipment', label: 'Medical Equipment' },
];

const ContactForm = () => {
  const [phone, setPhone] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', { phone, selectedCategory });
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md border border-gray-200"
    >
      <h2 className="text-xl font-semibold text-center text-blue-800 mb-4">
        Request a Callback
      </h2>
      <p className="text-sm text-center text-gray-600 mb-5">
        We'll get back to you within 24 hours
      </p>

      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-4 w-4 text-blue-500" />
          </div>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="pl-9 w-full text-sm rounded-lg border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition placeholder-gray-400"
            placeholder="Enter your phone number"
            required
          />
        </div>
      </div>

      <div className="mb-5 relative">
        <button
          type="button"
          onClick={toggleDropdown}
          className="w-full flex justify-between items-center text-sm rounded-lg border border-gray-300 py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition text-left"
        >
          <span className={selectedCategory ? 'text-gray-800' : 'text-gray-400'}>
            {selectedCategory || 'Select service category'}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
              dropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {dropdownOpen && (
          <div className="absolute z-20 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden animate-fadeIn">
            {categories.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() => selectCategory(category.label)}
                className={`block w-full text-left px-3 py-2 text-sm ${
                  selectedCategory === category.label
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-blue-50'
                } transition`}
              >
                {category.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition shadow-sm"
      >
        Request Callback
      </button>
    </form>
  );
};

export default ContactForm;