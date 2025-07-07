import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft, FiCalendar, FiClock, FiMapPin, FiStar, FiCheckCircle
} from 'react-icons/fi';
import { IoMdTime } from 'react-icons/io';
import { BsHeartFill, BsShieldCheck } from 'react-icons/bs';

const NurseDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const nurse = state?.nurse;
  const service = state?.service;

  useEffect(() => window.scrollTo(0, 0), []);

  const formatPrice = (value) => {
    if (typeof value === 'string' && value.includes('₹')) return value;
    return value ? `₹${Number(value).toLocaleString('en-IN')}` : '₹0';
  };

  if (!nurse || !service) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
        <div className="text-center max-w-md">
          <svg className="w-16 h-16 mx-auto text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-800 mt-4 mb-2">Nurse Not Found</h2>
          <p className="text-sm text-gray-600 mb-5">We couldn't find the nurse you're looking for.</p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 bg-gradient-to-r from-[#8D2E7D] to-[#6D1D6D] text-white rounded-lg text-sm font-medium shadow"
          >
            Return to List
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#8D2E7D] to-[#6D1D6D]">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <motion.button
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center text-white/90 hover:text-white text-sm"
          >
            <FiArrowLeft className="mr-1.5" size={16} /> Back
          </motion.button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <motion.div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-40 bg-gray-300 w-full">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <div className="relative z-20 px-5 -mt-12 flex flex-col sm:flex-row items-start sm:items-end">
              <div className="relative group">
                <img src={nurse.photo} alt={nurse.name} className="w-24 h-24 rounded-lg object-cover border-4 border-white shadow" />
                <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${nurse.available_now ? 'bg-green-400' : 'bg-gray-400'}`} />
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-5 text-white">
                <h1 className="text-xl font-bold">{nurse.name}</h1>
                <p className="text-purple-100 text-sm mt-0.5">{nurse.specialization.join(' • ')}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <div className="flex items-center bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    <FiStar className="text-yellow-300 mr-1" size={12} />
                    <span>{nurse.rating}</span>
                    <span className="text-purple-100 ml-0.5">({nurse.reviews})</span>
                  </div>
                  <div className="flex items-center bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    <IoMdTime className="text-white mr-1" size={12} />
                    <span>{nurse.experience_years} yrs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="md:col-span-2 space-y-6">
              {/* About */}
              <section>
                <h3 className="text-base font-semibold text-gray-800 mb-2 flex items-center">
                  <BsHeartFill className="text-[#8D2E7D] mr-2 text-sm" /> About
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Specialized in {nurse.specialization.join(' and ')} with {nurse.experience_years} years of experience.
                  {` ${nurse.name}`} has performed over {nurse.procedures_count} successful procedures.
                </p>
              </section>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <FiClock />, label: 'Experience', value: `${nurse.experience_years} Years` },
                  { icon: <FiCalendar />, label: 'Procedures', value: `${nurse.procedures_count}+` },
                  { icon: <FiStar />, label: 'Rating', value: `${nurse.rating}/5` },
                  { icon: <FiMapPin />, label: 'Distance', value: `${nurse.distance} km` }
                ].map(({ icon, label, value }, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center text-gray-500 mb-1">
                      {icon}
                      <span className="text-xs font-medium ml-1.5">{label}</span>
                    </div>
                    <p className="text-base font-bold text-gray-800">{value}</p>
                  </div>
                ))}
              </div>

              {/* Availability */}
              <section>
                <h3 className="text-base font-semibold text-gray-800 mb-2 flex items-center">
                  <IoMdTime className="text-[#8D2E7D] mr-2 text-sm" /> Availability
                </h3>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border border-green-100 flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${nurse.available_now ? 'bg-green-400' : 'bg-blue-400'}`} />
                  <p className="text-sm font-medium text-gray-800">
                    {nurse.available_now ? 'Available Today' : 'Available Tomorrow'}
                  </p>
                </div>
              </section>
            </div>

            {/* Booking Card */}
            <motion.div className="sticky top-4 bg-white border border-gray-200 rounded-lg shadow-sm p-4">
              <h3 className="text-base font-semibold text-gray-800 mb-3">Book Appointment</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Selected Service</span>
                  <span className="font-medium">{service.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service Price</span>
                  <span className="font-medium">{formatPrice(service.price)}</span>
                </div>
                <hr />
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-[#8D2E7D]">{formatPrice(service.price)}</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/payment', { state: { nurse, service, price: service.price } })}
                className="w-full bg-gradient-to-r from-[#8D2E7D] to-[#6D1D6D] text-white py-2.5 rounded-lg text-sm font-semibold shadow flex items-center justify-center"
              >
                <FiCheckCircle className="mr-1.5" size={14} />
                Confirm Booking
              </motion.button>
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <BsShieldCheck className="text-green-500 mr-1.5" size={12} />
                <span>Secure booking</span>
              </div>
            </motion.div>
          </div>

          {/* Testimonials */}
          <div className="p-5">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Patient Testimonials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex-shrink-0" />
                    <div>
                      <div className="flex items-center mb-1">
                        <h4 className="text-sm font-medium text-gray-800">Patient {i + 1}</h4>
                        <div className="ml-auto flex">
                          {[...Array(5)].map((_, j) => (
                            <FiStar key={j} size={12} className={`ml-0.5 ${j < 4 ? 'text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">"{nurse.name} was professional and thorough."</p>
                      <p className="text-xs text-gray-400">2 weeks ago</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NurseDetail;
