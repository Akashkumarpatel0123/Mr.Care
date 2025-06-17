import { useState } from 'react';
import NurseCard from '../Components/NurseCard';
import BookingModal from '../Components/BookingModal';
import { nurses } from '../data/nurses';
import { motion, AnimatePresence } from 'framer-motion';

const IVInjection = () => {
  const [filteredNurses, setFilteredNurses] = useState(nurses);
  const [selectedNurse, setSelectedNurse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [hoveredStatus, setHoveredStatus] = useState(null);

  const handleSort = (criteria) => {
    setSortBy(criteria);
    const sorted = [...filteredNurses].sort((a, b) => {
      switch(criteria) {
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

  const handleBookNow = (nurse) => {
    if (nurse.available_now) {
      setSelectedNurse(nurse);
      setShowModal(true);
    }
  };

  const handleBookingConfirm = (bookingDetails) => {
    console.log('Booking confirmed:', bookingDetails);
    setShowModal(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8 text-gray-800">IV Injection Services  दवा को सीधे रक्तप्रवाह में पहुंचाता है।</h1>
      
      <div className="mb-8">
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm"
        >
          <h2 className="text-xl font-semibold text-gray-800">
            {filteredNurses.length} {filteredNurses.length === 1 ? 'Nurse' : 'Nurses'} Available
          </h2>
          
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            >
              <option value="rating">Highest Rating</option>
              <option value="experience">Most Experience</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="distance">Nearest First</option>
            </select>
          </div>
        </motion.div>
        
        <div className="space-y-5">
          <AnimatePresence>
            {filteredNurses.length > 0 ? (
              filteredNurses.map((nurse, index) => (
                <motion.div
                  key={nurse.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                >
                  <div className="relative">
                    <NurseCard 
                      nurse={nurse} 
                      onBookNow={() => handleBookNow(nurse)}
                      isAvailable={nurse.available_now}
                    />
                    
                    {/* Enhanced Status Badge */}
                    <motion.div
                      className={`absolute top-4 right-4 z-10`}
                      onMouseEnter={() => setHoveredStatus(nurse.id)}
                      onMouseLeave={() => setHoveredStatus(null)}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className={`
                        flex items-center px-3 py-1 rounded-full shadow-sm
                        ${nurse.available_now 
                          ? 'bg-green-50 text-green-800 border border-green-100' 
                          : 'bg-gray-50 text-gray-500 border border-gray-200'}
                        transition-all duration-200
                      `}>
                        <span className={`
                          w-2.5 h-2.5 rounded-full mr-2
                          ${nurse.available_now ? 'bg-green-500' : 'bg-gray-400'}
                          ${hoveredStatus === nurse.id ? 'animate-pulse' : ''}
                        `}></span>
                        <span className="text-sm font-medium">
                          {hoveredStatus === nurse.id 
                            ? nurse.available_now 
                              ? 'Available for booking' 
                              : 'Currently unavailable'
                            : nurse.available_now 
                              ? 'Online' 
                              : 'Offline'}
                        </span>
                      </div>
                    </motion.div>
                    
                    {/* Disabled overlay for offline nurses */}
                    {!nurse.available_now && (
                      <div className="absolute inset-0 bg-white bg-opacity-70 rounded-xl cursor-not-allowed"></div>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-8 text-center rounded-xl shadow-md"
              >
                <div className="text-gray-500 mb-4">
                  <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-2 text-lg">No nurses available</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <AnimatePresence>
        {showModal && selectedNurse && (
          <BookingModal
            nurse={selectedNurse}
            onClose={() => setShowModal(false)}
            onConfirm={handleBookingConfirm}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default IVInjection;