import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { nurses } from '../data/nurses';

const Wound = () => {
  const navigate = useNavigate();
  const [filteredNurses, setFilteredNurses] = useState([]);
  const [sortBy, setSortBy] = useState('rating');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredStatus, setHoveredStatus] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedService, setSelectedService] = useState('small');

  // Safely get wound care nurses or empty array if not available
  const woundNurses = nurses?.wound || [];

  useEffect(() => {
    handleSort('rating');
  }, []);

  // Service pricing information specific to wound care
  const servicePricing = {
    small: {
      name: "Small Cut Dressing",
      price: "₹350/day",
      description: "Basic dressing for minor cuts and abrasions"
    },
    soline: {
      name: "Saline Dressing",
      price: "₹450/day",
      description: "Sterile saline solution dressing"
    },
    hydroyel: {
      name: "Hydrogel Dressing",
      price: "₹400/day",
      description: "Moist wound healing dressing"
    },
    pocking: {
      name: "Packing Dressing",
      price: "₹800/day",
      description: "For deep wound packing"
    },
    foam: {
      name: "Foam Dressing",
      price: "₹550/day",
      description: "Absorbent foam dressing"
    },
    antibiotic: {
      name: "Antibiotic Dressing",
      price: "₹450/day",
      description: "Medicated antibacterial dressing"
    },
    diabetic: {
      name: "Diabetic Dressing",
      price: "₹550/day",
      description: "Specialized for diabetic wounds"
    },
    premiumSmall: {
      name: "Premium Small Dressing",
      price: "₹1700/5 days",
      description: "Extended care package"
    },
    premiumSoline: {
      name: "Premium Saline Dressing",
      price: "₹2200/5 days",
      description: "Extended sterile care"
    },
    premiumHydroyel: {
      name: "Premium Hydrogel Dressing",
      price: "₹1950/5 days",
      description: "Extended moist healing"
    },
    premiumPocking: {
      name: "Premium Packing Dressing",
      price: "₹3850/5 days",
      description: "Extended deep wound care"
    },
    premiumFoam: {
      name: "Premium Foam Dressing",
      price: "₹2700/5 days",
      description: "Extended absorbent care"
    },
    premiumAntibiotic: {
      name: "Premium Antibiotic Dressing",
      price: "₹2200/5 days",
      description: "Extended medicated care"
    },
    premiumDiabetic: {
      name: "Premium Diabetic Dressing",
      price: "₹2700/5 days",
      description: "Extended specialized care"
    }
  };

  const handleSort = (criteria) => {
    setSortBy(criteria);
    const sorted = [...woundNurses].sort((a, b) => {
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
    
    const filtered = woundNurses.filter(nurse => 
      nurse.name?.toLowerCase().includes(query) ||
      nurse.specialization?.toLowerCase().includes(query) ||
      nurse.hospital?.toLowerCase().includes(query)
    );
    setFilteredNurses(filtered);
  };

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    let filtered = [...woundNurses];
    
    if (filter === 'available') {
      filtered = filtered.filter(nurse => nurse.available_now);
    } else if (filter === 'fast') {
      filtered = filtered.filter(nurse => nurse.available_now && nurse.distance < 5);
    } else if (filter === 'certified') {
      filtered = filtered.filter(nurse => nurse.certifications?.includes('Wound Care Certified'));
    } else if (filter === 'diabetic') {
      filtered = filtered.filter(nurse => nurse.certifications?.includes('Diabetic Wound Specialist'));
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
        className="mb-8 bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl border border-gray-100 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mr-3">Professional Wound Care at Home</h1>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 18a6 6 0 100-12 6 6 0 000 12zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2 2a1 1 0 101.414-1.414L13 9.586V6z" clipRule="evenodd" />
              </svg>
              30-Min Service
            </div>
          </div>
          
          {/* Service Pricing Options - Full Width */}
          <div className="mb-6 w-full">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Select Wound Care Service:</h3>
            
            {/* Standard Services */}
            <div className="mb-6">
              <h4 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 text-xs">Standard</span>
                Daily Dressing Services
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(servicePricing).slice(0, 7).map(([key, service]) => (
                  <motion.label 
                    key={key}
                    whileHover={{ y: -3 }}
                    className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${
                      selectedService === key 
                        ? 'border-green-500 bg-green-50 shadow-md' 
                        : 'border-gray-200 hover:border-green-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="woundService"
                      value={key}
                      checked={selectedService === key}
                      onChange={() => setSelectedService(key)}
                      className="mt-1 mr-3 text-green-600 focus:ring-green-500"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-900">{service.name}</h4>
                        <span className="text-lg font-bold text-green-700 whitespace-nowrap ml-2">{service.price}</span>
                      </div>
                      {service.description && (
                        <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                      )}
                      <div className="mt-3 flex items-center text-xs text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {key.includes('premium') ? '5-day package' : 'Daily service'}
                      </div>
                    </div>
                  </motion.label>
                ))}
              </div>
            </div>
            
            {/* Premium Services */}
            <div>
              <h4 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded mr-2 text-xs">Premium</span>
                5-Day Care Packages (Save 10-15%)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(servicePricing).slice(7).map(([key, service]) => (
                  <motion.label 
                    key={key}
                    whileHover={{ y: -3 }}
                    className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${
                      selectedService === key 
                        ? 'border-purple-500 bg-purple-50 shadow-md' 
                        : 'border-gray-200 hover:border-purple-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="woundService"
                      value={key}
                      checked={selectedService === key}
                      onChange={() => setSelectedService(key)}
                      className="mt-1 mr-3 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-gray-900">{service.name}</h4>
                        <span className="text-lg font-bold text-purple-700 whitespace-nowrap ml-2">{service.price}</span>
                      </div>
                      {service.description && (
                        <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                      )}
                      <div className="mt-3 flex items-center text-xs text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
                        </svg>
                        Save {key.includes('Small') ? '15%' : '10%'} vs daily
                      </div>
                    </div>
                  </motion.label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <div className="flex items-center bg-white px-3 py-1.5 rounded-full text-sm shadow-xs border border-gray-200">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Sterile Techniques
            </div>
            <div className="flex items-center bg-white px-3 py-1.5 rounded-full text-sm shadow-xs border border-gray-200">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Pain Management
            </div>
            <div className="flex items-center bg-white px-3 py-1.5 rounded-full text-sm shadow-xs border border-gray-200">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Infection Prevention
            </div>
          </div>
        </div>
        
        {/* Decorative medical illustration */}
        <div className="absolute right-0 top-0 h-full opacity-20">
          <svg className="h-full w-auto" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 30L70 50L90 30L110 50L130 30L150 50" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
            <path d="M60 70L80 60L100 70L120 60" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
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
          <div className="text-2xl font-bold text-green-600">35 min</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500">Healing Rate</div>
          <div className="text-2xl font-bold text-blue-600">95%</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="text-sm text-gray-500">Available Now</div>
          <div className="text-2xl font-bold text-purple-600">{woundNurses.filter(n => n.available_now).length}</div>
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
              {filteredNurses.length} {filteredNurses.length === 1 ? 'Wound Specialist Available' : 'Wound Specialists Available'}
            </h2>
            
            {/* Quick Filters */}
            <div className="hidden sm:flex space-x-2">
              <button
                onClick={() => handleFilter('all')}
                className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'all' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}
              >
                All
              </button>
              <button
                onClick={() => handleFilter('available')}
                className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'available' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
              >
                Available Now
              </button>
              <button
                onClick={() => handleFilter('certified')}
                className={`px-3 py-1 rounded-full text-sm ${activeFilter === 'certified' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'}`}
              >
                Wound Certified
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
                className="border rounded-lg pl-10 pr-3 py-2 w-full text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2 w-full md:w-auto">
              <label className="text-sm text-gray-600 whitespace-nowrap">Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
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
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${activeFilter === 'all' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}
          >
            All
          </button>
          <button
            onClick={() => handleFilter('available')}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${activeFilter === 'available' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
          >
            Available
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
                      <p className="text-sm text-green-600 font-bold">{servicePricing[selectedService].price}</p>
                    </div>

                    <button
                      onClick={() => handleBookNow(nurse)}
                      disabled={!nurse.available_now}
                      className={`w-full py-2 px-4 rounded-lg font-medium text-sm ${nurse.available_now 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
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
              <h3 className="text-lg font-medium text-gray-700 mb-2">No wound care specialists available</h3>
              <p className="text-gray-500 mb-6">We couldn't find any nurses matching your criteria</p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                  handleSort('rating');
                }}
                className="px-5 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 shadow-sm"
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

export default Wound;