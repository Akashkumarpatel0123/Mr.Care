import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaHome, FaCalendarAlt, FaHistory, FaUser, FaSearch } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const HomePage = () => {
  const userPosition = [12.9716, 77.5946]; // Bangalore coordinates
  const nearbyNurses = [
    {
      id: 1,
      name: "Nurse Priya Sharma",
      position: [12.9736, 77.5926],
      available: true,
      rating: 4.8,
      experience: "5 years",
      specialties: ["Elder Care", "Post-Op Care"]
    },
    {
      id: 2,
      name: "Nurse Rahul Patel",
      position: [12.9696, 77.5966],
      available: false,
      rating: 4.5,
      experience: "3 years",
      specialties: ["General Checkup", "Child Care"]
    },
    {
      id: 3,
      name: "Nurse Anjali Gupta",
      position: [12.9756, 77.5906],
      available: true,
      rating: 4.9,
      experience: "7 years",
      specialties: ["Emergency", "ICU Care"]
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow px-4 py-3 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center">
          <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">NurseBuddy</h1>
            <p className="text-xs text-gray-500">Healthcare at your doorstep</p>
          </div>
        </div>
        <button className="relative p-1">
          <IoMdNotifications className="text-2xl text-gray-600" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
        </button>
      </header>

      {/* Search */}
      <div className="px-4 py-3 bg-blue-50">
        <div className="relative">
          <input
            type="text"
            placeholder="Search nurses, services..."
            className="w-full py-3 pl-10 pr-4 bg-white rounded-lg shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
        </div>
      </div>

      {/* Map */}
      <div className="flex-grow relative">
        <MapContainer 
          center={userPosition} 
          zoom={14} 
          className="h-full w-full z-0"
          style={{ minHeight: '350px' }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={userPosition}>
            <Popup className="font-medium">Your Location</Popup>
          </Marker>
          {nearbyNurses.map(nurse => (
            <Marker
              key={nurse.id}
              position={nurse.position}
              icon={L.icon({
                ...L.Icon.Default.prototype.options,
                iconUrl: nurse.available
                  ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png'
                  : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41]
              })}
            >
              <Popup className="w-64">
                <div className="space-y-2">
                  <h3 className="font-bold text-blue-600">{nurse.name}</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-500">⭐ {nurse.rating}</span>
                    <span className="mx-2 text-gray-300">|</span>
                    <span>{nurse.experience}</span>
                  </div>
                  <div className={`text-sm ${nurse.available ? 'text-green-600' : 'text-red-600'} font-medium`}>
                    {nurse.available ? 'Available Now' : 'Currently Busy'}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {nurse.specialties.map((spec, i) => (
                      <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md text-sm font-medium transition">
                    {nurse.available ? 'Book Appointment' : 'Check Later'}
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t shadow-sm flex justify-around items-center py-2">
        <button className="flex flex-col items-center text-blue-600 px-4 py-1">
          <FaHome className="text-xl" />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-500 px-4 py-1 hover:text-blue-600">
          <FaCalendarAlt className="text-xl" />
          <span className="text-xs mt-1">Bookings</span>
        </button>
        <button className="flex flex-col items-center text-gray-500 px-4 py-1 hover:text-blue-600">
          <FaHistory className="text-xl" />
          <span className="text-xs mt-1">History</span>
        </button>
        <button className="flex flex-col items-center text-gray-500 px-4 py-1 hover:text-blue-600">
          <FaUser className="text-xl" />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </nav>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 text-gray-400">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">NurseBuddy</h2>
              <p>Healthcare services at your doorstep</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Company</h3>
                <ul className="space-y-2">
                  <li>About Us</li>
                  <li>Careers</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li>Terms of Use</li>
                  <li>Privacy Policy</li>
                  <li>Cookie Policy</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
                <ul className="space-y-2">
                  <li>Help Center</li>
                  <li>Account</li>
                  <li>Feedback</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p>© {new Date().getFullYear()} NurseBuddy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
