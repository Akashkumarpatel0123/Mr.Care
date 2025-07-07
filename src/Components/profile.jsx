import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    address: '',
    pincode: '',
    landmark: '',
    countryCode: '+91',
  });

  // Fetch profile on load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);

      // Pre-fill username and email from localStorage
      setFormData((prev) => ({
        ...prev,
        username: user.name || '',
        email: user.email || '',
      }));

      // Fetch full profile from backend
      axios
        .get(`http://localhost:10000/api/profile/${user.id}`)
        .then((res) => {
          const data = res.data;
          if (data) {
            setFormData({
              username: data.username || user.name || '',
              email: data.email || user.email || '',
              mobile: data.mobile || '',
              address: data.address || '',
              pincode: data.pincode || '',
              landmark: data.landmark || '',
              countryCode: data.country_code || '+91',
            });
          }
        })
        .catch((err) => {
          console.error('❌ Failed to fetch profile:', err);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || !storedUser.id) {
      alert('User not logged in');
      return;
    }

    const finalData = {
      user_id: storedUser.id,
      username: formData.username,
      email: formData.email,
      mobile: `${formData.countryCode} ${formData.mobile}`,
      address: formData.address,
      pincode: formData.pincode,
      landmark: formData.landmark,
      country_code: formData.countryCode,
    };

    try {
      await axios.post('http://localhost:10000/api/profile', finalData);
      alert('✅ Profile saved successfully!');
    } catch (err) {
      console.error('❌ Failed to save profile:', err);
      alert('❌ Failed to save profile');
    }
  };

  const handleBackToHome = () => {
    navigate('/home', { replace: true });
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-pink-800 p-5 text-sm text-white font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-2xl mx-auto w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">👤 Profile Settings</h1>
          <button
            onClick={handleBackToHome}
            className="text-white flex items-center text-sm font-medium hover:underline"
          >
            ← Back to Home
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl text-gray-800 overflow-hidden"
        >
          <div className="flex items-center p-5 border-b">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-600 mr-4">
              <img
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=687&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-semibold text-lg flex items-center">
                @{formData.username}
                <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                  Online
                </span>
              </h2>
              <p className="text-xs text-gray-500">{formData.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1">Username</label>
                <input
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  pattern="[a-zA-Z0-9_]+"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">Mobile Number</label>
              <div className="flex">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="w-20 px-2 rounded-l-lg border border-gray-300 bg-gray-100"
                >
                  <option>+91</option>
                  <option>+1</option>
                  <option>+44</option>
                </select>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="9876543210"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">Complete Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium mb-1">Pincode</label>
                <input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  pattern="\d{6}"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">Landmark</label>
                <input
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-5 gap-3 border-t">
              <button
                type="button"
                onClick={handleBackToHome}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Save Changes
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
