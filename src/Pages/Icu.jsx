import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { nurses } from '../data/nurses';

const ICU = () => {
  const navigate = useNavigate();
  const [filteredNurses, setFilteredNurses] = useState([]);
  const [sortBy, setSortBy] = useState('rating');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredStatus, setHoveredStatus] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedService, setSelectedService] = useState('basic');

  // Safely get ICU nurses or empty array if not available
  const icuNurses = nurses?.icu || [];

  useEffect(() => {
    handleSort('rating');
  }, []);

  // Service pricing information
  const servicePricing = {
    basic: {
      name: "Basic ICU Care",
      price: "₹1300/12hour",
      description: "Standard critical care monitoring"
    },
    advanced: {
      name: "Advanced ICU Care",
      price: "₹6350/5day ",
      description: "Includes ventilator management"
    },
    postop: {
      name: "Post-Operative Care",
      price: "₹12700/10day",
      description: "Specialized surgical recovery care"
    }
  };

  const handleSort = (criteria) => {
    setSortBy(criteria);
    const sorted = [...icuNurses].sort((a, b) => {
      switch (criteria) {
        case 'rating': return b.rating - a.rating;
        case 'experience': return b.experience_years - a.experience_years;
        case 'price_asc': return a.hourly_rate - b.hourly_rate;
        case 'price_desc': return b.hourly_rate - a.hourly_rate;
        case 'distance': return a.distance - b.distance;
        default: return 0;
      }
    });
    setFilteredNurses(sorted);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    const filtered = icuNurses.filter(nurse => 
      nurse.name?.toLowerCase().includes(query) ||
      nurse.specialization?.toLowerCase().includes(query) ||
      nurse.hospital?.toLowerCase().includes(query)
    );
    setFilteredNurses(filtered);
  };

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    let filtered = [...icuNurses];
    
    if (filter === 'available') {
      filtered = filtered.filter(nurse => nurse.available_now);
    } else if (filter === 'emergency') {
      filtered = filtered.filter(nurse => nurse.available_now && nurse.distance < 5);
    } else if (filter === 'critical') {
      filtered = filtered.filter(nurse => nurse.certifications?.includes('Critical Care Specialist'));
    }
    
    setFilteredNurses(filtered);
  };

  const handleBookNow = (nurse) => {
    navigate('/nurse-detail', { 
      state: { 
        nurse,
        service: servicePricing[selectedService]
      } 
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 max-w-7xl"
    >
      {/* Hero Section with service options */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-gray-100 relative overflow-hidden"
      >
        <div className="max-w-3xl relative z-10">
          <div className="flex items-center mb-3">
            <h1 className="text-3xl font-bold text-gray-900 mr-3">At-Home ICU Nursing Services</h1>
            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 18a6 6 0 100-12 6 6 0 000 12zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2 2a1 1 0 101.414-1.414L13 9.586V6z" clipRule="evenodd" />
              </svg>
              24/7 Critical Care
            </div>
          </div>
          
          {/* Service Pricing Options */}
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Select Service Level:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {Object.entries(servicePricing).map(([key, service]) => (
                <label 
                  key={key}
                  className={`flex items-start p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedService === key 
                      ? 'border-purple-500 bg-purple-50 shadow-sm' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="icuService"
                    value={key}
                    checked={selectedService === key}
                    onChange={() => setSelectedService(key)}
                    className="mt-1 mr-3 text-purple-600 focus:ring-purple-500"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-900">{service.name}</h4>
                      <span className="text-lg font-bold text-purple-700">{service.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center bg-white px-3 py-1.5 rounded-full text-sm shadow-xs border border-gray-200">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Ventilator Trained
            </div>
            <div className="flex items-center bg-white px-3 py-1.5 rounded-full text-sm shadow-xs border border-gray-200">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Emergency Response
            </div>
            <div className="flex items-center bg-white px-3 py-1.5 rounded-full text-sm shadow-xs border border-gray-200">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Medication Management
            </div>
          </div>
        </div>
        
        {/* Decorative medical illustration */}
        <div className="absolute right-0 top-0 h-full opacity-20">
          <svg className="h-full w-auto" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50L150 100L100 150L50 100L100 50Z" stroke="#4F46E5" strokeWidth="8"/>
            <circle cx="100" cy="100" r="30" stroke="#4F46E5" strokeWidth="8"/>
          </svg>
        </div>
      </motion.div>

      {/* Quick Stats Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      >
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500">Average Response</div>
          <div className="text-2xl font-bold text-purple-600">45 min</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500">Success Rate</div>
          <div className="text-2xl font-bold text-green-600">98.5%</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500">Available Now</div>
          <div className="text-2xl font-bold text-blue-600">{icuNurses.filter(n => n.available_now).length}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500">Patient Rating</div>
          <div className="text-2xl font-bold text-yellow-600">4.9/5</div>
        </div>
      </motion.div>

      {/* Filters Section */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-6 bg-white p-5 rounded-2xl shadow-sm border border-gray-100"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-800 mr-4">
              {filteredNurses.length} {filteredNurses.length === 1 ? 'Specialist Available' : 'Specialists Available'}
            </h2>
            
            {/* Quick Filters */}
            <div className="hidden sm:flex space-x-2">
              <button
                onClick={() => handleFilter('all')}
                className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'all' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-700'}`}
              >
                All
              </button>
              <button
                onClick={() => handleFilter('available')}
                className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}
              >
                Available Now
              </button>
              <button
                onClick={() => handleFilter('emergency')}
                className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'emergency' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700'}`}
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                  Emergency
                </span>
              </button>
              <button
                onClick={() => handleFilter('critical')}
                className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'critical' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'}`}
              >
                Critical Care Certified
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto gap-3">
            {/* Search */}
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name, hospital..."
                value={searchQuery}
                onChange={handleSearch}
                className="border rounded-lg pl-10 pr-3 py-2 w-full text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <label className="text-sm text-gray-600 whitespace-nowrap">Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
              >
                <option value="rating">Highest Rating</option>
                <option value="distance">Nearest First</option>
                <option value="experience">Most Experience</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Filters */}
        <div className="sm:hidden mt-4 flex space-x-2 overflow-x-auto pb-2">
          <button
            onClick={() => handleFilter('all')}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${activeFilter === 'all' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-700'}`}
          >
            All
          </button>
          <button
            onClick={() => handleFilter('available')}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${activeFilter === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}
          >
            Available
          </button>
          <button
            onClick={() => handleFilter('emergency')}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${activeFilter === 'emergency' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700'}`}
          >
            Emergency
          </button>
          <button
            onClick={() => handleFilter('critical')}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${activeFilter === 'critical' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'}`}
          >
            Critical Care
          </button>
        </div>
      </motion.div>

      {/* Nurse Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <AnimatePresence>
          {filteredNurses.length > 0 ? (
            filteredNurses.map((nurse, index) => (
              <motion.div
                key={nurse.id || index}
                variants={itemVariants}
                exit="exit"
                layout
                className="relative"
              >
                <motion.div
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ duration: 0.2 }}
                  className="h-full bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm"
                >
                  {/* Nurse Photo and Basic Info */}
                  <div className="flex p-4 border-b border-gray-100">
                    <div className="relative h-16 w-16 flex-shrink-0 mr-4">
                      <img 
                        src={nurse.photo || '/default-nurse.jpg'} 
                        alt={nurse.name}
                        className="h-full w-full rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      {nurse.available_now && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-semibold text-gray-900">{nurse.name}</h3>
                      <p className="text-sm text-gray-600">{nurse.specialization}</p>
                      <div className="flex items-center mt-1">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700 ml-1">{nurse.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({nurse.reviews || 0} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Info */}
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Experience</p>
                        <p className="font-medium">{nurse.experience_years || 0}+ years</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="font-medium">₹{nurse.hourly_rate || 'N/A'}/hour</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Distance</p>
                        <p className="font-medium">{nurse.distance || 'N/A'} km</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Hospital</p>
                        <p className="font-medium truncate">{nurse.hospital || 'Not specified'}</p>
                      </div>
                    </div>

                    <div className="mb-3 p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Selected Service</p>
                      <p className="font-medium">{servicePricing[selectedService].name}</p>
                      <p className="text-sm text-purple-600 font-bold">{servicePricing[selectedService].price}</p>
                    </div>

                    <button
                      onClick={() => handleBookNow(nurse)}
                      disabled={!nurse.available_now}
                      className={`w-full py-2 px-4 rounded-lg font-medium text-sm ${nurse.available_now 
                        ? 'bg-purple-600 text-white hover:bg-purple-700' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                    >
                      {nurse.available_now ? 'Book Now' : 'Currently Unavailable'}
                    </button>
                  </div>

                  {/* Status Badge */}
                  <motion.div
                    className="absolute top-3 right-3 z-10"
                    onMouseEnter={() => setHoveredStatus(index)}
                    onMouseLeave={() => setHoveredStatus(null)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={`
                      flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                      ${nurse.available_now 
                        ? 'bg-green-50 text-green-800 border border-green-200 shadow-xs'
                        : 'bg-gray-50 text-gray-500 border border-gray-200'}
                    `}>
                      <span className={`w-2 h-2 rounded-full mr-1.5
                        ${nurse.available_now ? 'bg-green-500' : 'bg-gray-400'}
                        ${hoveredStatus === index ? 'animate-pulse' : ''}
                      `}></span>
                      <span>
                        {hoveredStatus === index
                          ? nurse.available_now 
                            ? `Available - ${nurse.distance < 5 ? 'Can arrive in 30 min' : 'Can arrive in 45 min'}` 
                            : 'Currently unavailable'
                          : nurse.available_now ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </motion.div>

                  {/* Time Badge */}
                  {nurse.available_now && (
                    <div className="absolute top-14 right-3 z-10">
                      <div className="flex items-center bg-blue-50 px-2.5 py-1 rounded-full text-xs font-medium text-blue-800 border border-blue-200 shadow-xs">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {nurse.distance < 5 ? '30 min' : '45 min'}
                      </div>
                    </div>
                  )}

                  {/* Certification Badge */}
                  {nurse.certifications?.includes('Critical Care Specialist') && (
                    <div className="absolute top-14 left-3 z-10">
                      <div className="flex items-center bg-yellow-50 px-2.5 py-1 rounded-full text-xs font-medium text-yellow-800 border border-yellow-200 shadow-xs">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Critical Care Certified
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 text-center rounded-xl shadow-md col-span-full"
            >
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-700 mb-2">No specialists available</h3>
              <p className="text-gray-500 mb-6">We couldn't find any nurses matching your criteria</p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                  handleSort('rating');
                }}
                className="px-5 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 shadow-sm"
              >
                Reset All Filters
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default ICU;