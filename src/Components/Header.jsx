import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Bell, LogOut, User, LogIn, Search } from 'lucide-react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [location, setLocation] = useState("Fetching location...");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const username = user?.name || user?.username || 'Guest';

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/');
  };

  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(`http://localhost:10000/api/service/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      console.log(data);
      setSearchResults(data?.services || ['Nothing Found!']);
    } catch (error) {
      console.error("Search failed", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleSearch = useCallback(debounce((query) => {
    if (query.trim()) {
      setIsSearching(true);
      fetchSearchResults(query);
    } else {
      setSearchResults([]);
    }
  }, 500), []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for "${searchQuery}"`);
    } else {
      toast.warning('Please enter a search term');
    }
  };

  useEffect(() => {
    const apiKey = "dc2760c39af4431bbf58dcc2eda40fc5";
    const fetchLocation = async (lat, lng) => {
      try {
        const res = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`
        );
        const data = await res.json();
        const address = data.results[0]?.formatted;
        setLocation(address || "Location not found");
      } catch (error) {
        console.error("Reverse geocoding error:", error);
        setLocation("Unable to fetch address");
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocation(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocation("Permission denied");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  return (
    <header className="bg-gradient-to-r from-[#8D2E7D] to-[#C44594] text-white p-3 rounded-b-3xl shadow-md relative">
      {/* Top Row */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-lg font-semibold">Mr.care</h1>

        {/* Search */}
        <div className="mx-4 relative w-1/3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search services..."
              className="w-full px-3 py-1 pl-8 rounded-lg text-black text-xs focus:outline-none"
            />
            <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </form>

          {(searchResults.length > 0 || isSearching) && (
            <div className="absolute top-full left-0 right-0 bg-white text-black mt-1 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {isSearching ? (
                <div className="p-2 text-center text-xs text-gray-500">Searching...</div>
              ) : (
                searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="p-2 border-b border-gray-100 text-xs hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSearchQuery(result);
                      setSearchResults([]);
                      toast.success(`Selected: ${result}`);
                      // Optionally: navigate(`/services/${result._id}`);
                    }}
                  >
                    {result}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Bell + User */}
        <div className="flex items-center space-x-2">
          <button className="bg-white/20 p-1 rounded-full">
            <Bell size={16} />
          </button>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-white/20 p-1 rounded-full flex items-center justify-center"
            >
              <User size={16} />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50">
                <button
                  className="flex items-center px-3 py-2 text-sm text-blue-600 hover:bg-gray-100 w-full text-left"
                  onClick={handleLogin}
                >
                  <LogIn size={14} className="mr-2" />
                  Login
                </button>
                <button
                  className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                  onClick={handleLogout}
                >
                  <LogOut size={14} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Welcome + Location */}
      <div>
        <p className="text-xs">Welcome, {username}</p>
        <div className="flex items-center mt-1 text-xs">
          <FaMapMarkerAlt className="mr-1" size={10} />
          <span className="truncate max-w-xs">{location}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
