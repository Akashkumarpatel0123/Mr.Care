import React, { useState } from 'react';
import { Filter } from 'lucide-react';

const Sidebar = ({ quickLinks }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      {/* Header with toggle */}
      <button
        onClick={toggleFilter}
        className="flex items-center mb-4 text-xl font-bold text-gray-800 hover:text-[#00A0A0] transition"
      >
        <Filter className="w-5 h-5 mr-2" />
        Filters
      </button>

      {/* Collapsible content */}
      {isOpen && (
        <>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Quick Link</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`flex items-center text-[#00A0A0] hover:text-[#008080] ${
                      link.isActive ? 'font-medium' : ''
                    }`}
                  >
                    <span className="mr-2">❯❯❯</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Brands</h3>
            {/* Brands content would go here */}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
