import { useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaKey, FaTimes, FaCheck } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!formData.email) return;

    try {
      const response = await fetch("http://localhost:10000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setOtpVerified(false);
        alert("OTP sent successfully!");
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (error) {
      alert("Network error while sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (!formData.otp) return;
    
    setOtpLoading(true);
    try {
      // Simulate API call to verify OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, verify any 6-digit code
      if (/^\d{6}$/.test(formData.otp)) {
        setOtpVerified(true);
      } else {
        alert("Invalid OTP. Please enter a 6-digit code.");
      }
    } catch (error) {
      alert("Error verifying OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      alert("Please verify your OTP first!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:10000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        // Save user data to localStorage
        localStorage.setItem('userData', JSON.stringify({
          username: formData.username,
          email: formData.email
        }));
        localStorage.setItem('authToken', data.token);
        
        alert("Registration successful!");
        navigate('/home');
      } else {
        alert(data.message || "Registration failed!");
      }
    } catch (error) {
      alert("Network error during registration");
    }
  };

  const handleSkipRegister = () => {
    navigate('/login');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex justify-center items-center p-4">
      {/* Background red elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 rounded-bl-full opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-500 rounded-tr-full opacity-20"></div>

      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md relative overflow-hidden">
        {/* Skip button at top-right corner of card */}
        <button 
          onClick={handleSkipRegister}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-500 transition-colors z-20"
          aria-label="Skip registration"
        >
          <FaTimes className="text-lg" />
          <span className="sr-only">Skip & Explore</span>
        </button>
        
        {/* Text version visible on hover */}
        <button 
          onClick={handleSkipRegister}
          className="absolute top-4 right-4 hidden group-hover:flex items-center space-x-1 bg-white px-3 py-1 rounded-full text-xs text-gray-600 hover:text-red-500 border border-gray-200 shadow-sm transition-all"
          aria-label="Skip registration"
        >
          <span>Skip</span>
          <FaTimes className="text-xs" />
        </button>

        {/* Red accent elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500 rounded-full opacity-10"></div>
        <div className="absolute top-0 right-0 w-16 h-1 bg-red-500"></div>

        <div className="p-6 pt-12">
          {/* Logo */}
          <div className="text-center mb-6 relative z-10">
            <h1 className="text-2xl font-bold text-purple-800">
              Mr.<span className="text-green-600">Care</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">Your Health, Our Responsibility</p>
          </div>

          {/* Registration Form */}
          <form className="space-y-3" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="relative">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-500 text-sm" />
            </div>

            {/* Email with OTP button */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-9 pr-24 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-500 text-sm" />
              <button
                onClick={handleSendOtp}
                disabled={otpSent || !formData.email}
                className={`absolute top-1/2 right-2 transform -translate-y-1/2 text-xs px-2 py-1 rounded transition-all ${
                  otpSent 
                    ? "bg-gray-200 text-gray-500" 
                    : "bg-purple-100 text-purple-700 hover:bg-purple-200 hover:text-purple-800"
                }`}
              >
                {otpSent ? "OTP Sent" : "Send OTP"}
              </button>
            </div>

            {/* OTP Input with Verification Animation */}
            {otpSent && (
              <div className="relative">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full pl-9 pr-20 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                  maxLength="6"
                />
                <FaKey className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-500 text-sm" />
                
                {!otpVerified ? (
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={otpLoading || !formData.otp}
                    className={`absolute top-1/2 right-2 transform -translate-y-1/2 text-xs px-2 py-1 rounded transition-all ${
                      otpLoading
                        ? "bg-gray-200 text-gray-500"
                        : "bg-purple-100 text-purple-700 hover:bg-purple-200 hover:text-purple-800"
                    }`}
                  >
                    {otpLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-1 h-3 w-3 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                      </span>
                    ) : (
                      "Verify"
                    )}
                  </button>
                ) : (
                  <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-green-500 flex items-center">
                    <FaCheck className="mr-1" />
                    Verified
                  </span>
                )}
                
                {/* OTP input animation */}
                {formData.otp && !otpVerified && (
                  <div className="absolute bottom-0 left-0 h-0.5 bg-purple-500 animate-pulse" style={{ width: `${(formData.otp.length / 6) * 100}%` }}></div>
                )}
              </div>
            )}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-9 pr-8 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-500 text-sm" />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 hover:text-purple-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOffOutline size={16} /> : <IoEyeOutline size={16} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-9 pr-8 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-500 text-sm" />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 hover:text-purple-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <IoEyeOffOutline size={16} /> : <IoEyeOutline size={16} />}
              </button>
            </div>

            {/* Register Button with red hover effect */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2 text-sm rounded-lg hover:shadow-lg transition-all duration-300 font-medium mt-4 group relative overflow-hidden"
              disabled={!otpVerified}
            >
              <span className="relative z-10">Create Account</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 group-hover:h-full transition-all duration-300 ease-out"></span>
            </button>
          </form>

          {/* Footer Links with red accents */}
          <div className="text-center mt-4 text-xs text-gray-600 space-y-1.5 relative">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 hover:text-red-600 font-medium transition-colors">
                Log In
              </Link>
            </p>
            <p>
              Join as a Part-Time Nurse?{" "}
              <Link to="/provider-register" className="text-purple-600 hover:text-red-600 font-medium transition-colors">
                Click here
              </Link>
            </p>
            
            {/* Small red decorative elements */}
            <div className="absolute -bottom-2 left-1/4 w-2 h-2 bg-red-500 rounded-full opacity-30"></div>
            <div className="absolute -bottom-2 right-1/4 w-2 h-2 bg-red-500 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </div>
  );
}