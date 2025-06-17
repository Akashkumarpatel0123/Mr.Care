import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { FaEnvelope, FaLock, FaUser, FaIdCard, FaPhone, FaTimes, FaCheck } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import verificationAnimation from "../assets/verificationAnimation.json";

export default function NurseRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    licenseNumber: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSkip = () => {
    navigate("/Nurse-login", { replace: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendOtp = async () => {
    if (!formData.email) {
      setErrorMsg("Please enter your email first");
      return;
    }

    try {
      await axios.post("http://localhost:10000/api/auth/nurse-send-otp", {
        email: formData.email,
      });
      setOtpSent(true);
      setSuccessMsg("OTP sent to your email!");
      setErrorMsg("");
    } catch (error) {
      console.error("OTP send error:", error.response?.data || error.message);
      setErrorMsg("Failed to send OTP. Please try again.");
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      setErrorMsg("Please enter the OTP");
      return;
    }

    setIsVerifying(true);
    try {
      const res = await axios.post("http://localhost:10000/api/auth/nurse-verify-otp", {
        email: formData.email,
        otp: otp,
      });

      if (res.data?.success) {
        setIsVerified(true);
        setSuccessMsg("Email verified successfully!");
        setErrorMsg("");
      } else {
        setErrorMsg("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setErrorMsg("Invalid OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!isVerified) {
      setErrorMsg("Please verify your email first");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

  try {
  const res = await axios.post("http://localhost:10000/api/auth/nurse-register", {
    name: formData.name,
    email: formData.email,
    licenseNumber: formData.licenseNumber || undefined,
    mobile: formData.mobile,
    password: formData.password,
    isEmailVerified: true,
    confirmPassword: formData.confirmPassword,
  });

  console.log("🔥 FULL RESPONSE:", res.data);

  if (res.data.token) {
    console.log("✅ Token found:", res.data.token);
    localStorage.setItem("authToken", res.data.token);
    localStorage.setItem("nurseData", JSON.stringify(res.data.user));
    login(res.data.user); // ✅ Fix here
    setSuccessMsg("Registration successful! Redirecting...");
    console.log("✅ Success message set");

    setTimeout(() => {
      console.log("🚀 Navigating to /nurse-dashboard");
      navigate("/nurse-dashboard", { replace: true });
    }, 1500);
  } else if (res.data.message) {
    setErrorMsg(res.data.message);
  } else {
    setErrorMsg("Registration failed. Please try again.");
  }
} catch (error) {
  console.error("❌ Nurse Registration error:", error);
  const msg = error.response?.data?.message || "Registration failed. Please try again.";
  setErrorMsg(msg);
}

  }; // Added this missing closing brace
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex justify-center items-center p-4">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-bl-full opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500 rounded-tr-full opacity-20"></div>

      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md relative overflow-hidden">
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-500 transition-colors z-20"
          aria-label="Skip registration"
        >
          <FaTimes className="text-lg" />
        </button>

        <div className="p-6 pt-12">
          <div className="text-center mb-6 relative z-10">
            <h1 className="text-2xl font-bold text-blue-800">
              Mr.<span className="text-teal-600">Care</span> Nurse
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Professional Healthcare Registration
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {errorMsg && (
              <p className="text-sm text-red-600 mb-2 text-center">{errorMsg}</p>
            )}
            {successMsg && (
              <p className="text-sm text-green-600 mb-2 text-center">{successMsg}</p>
            )}

            {/* Name */}
            <InputField icon={<FaUser />} name="name" value={formData.name} placeholder="Full Name" onChange={handleChange} />

            {/* Email with OTP */}
            <div className="mb-3 relative">
              <div className="flex">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Professional Email"
                  className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={otpSent}
                />
                <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-blue-500 text-sm" />
                {!otpSent && (
                  <button
                    type="button"
                    onClick={sendOtp}
                    className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    Send OTP
                  </button>
                )}
              </div>
            </div>

          {/* OTP Verification */}
{otpSent && !isVerified && (
  <div className="mb-3 relative">
    <div className="flex items-center">
      <input
        type="text"
        value={otp}
        onChange={(e) => {
          const value = e.target.value;
          // Allow only numeric input and max 6 digits
          if (/^\d{0,6}$/.test(value)) setOtp(value);
        }}
        maxLength={6}
        placeholder="Enter 6-digit OTP"
        className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        inputMode="numeric"
        pattern="\d{6}"
      />
      <button
        type="button"
        onClick={verifyOtp}
        className="ml-2 px-3 py-1 bg-green-100 text-green-700 text-xs rounded-lg hover:bg-green-200 transition-colors"
        disabled={isVerifying || otp.length !== 6}
      >
        {isVerifying ? "Verifying..." : "Verify"}
      </button>
    </div>
    <small className="block text-gray-400 mt-1 text-xs text-center">Enter exactly 6 digits</small>
  </div>
)}

            {isVerifying && (
              <div className="mb-3 flex justify-center">
                <div className="w-20 h-20">
                  <Lottie animationData={verificationAnimation} loop={true} />
                </div>
              </div>
            )}

            {isVerified && (
              <div className="mb-3 flex items-center justify-center bg-green-50 p-2 rounded-lg">
                <FaCheck className="text-green-500 mr-2" />
                <span className="text-green-700 text-sm">Email verified</span>
              </div>
            )}

            {/* License Number */}
            <InputField icon={<FaIdCard />} name="licenseNumber" value={formData.licenseNumber} placeholder="Nursing License Number (optional)" onChange={handleChange} />

            {/* Phone */}
            <InputField icon={<FaPhone />} name="mobile" value={formData.mobile} placeholder="Phone Number" onChange={handleChange} required />

            {/* Password */}
            <PasswordField
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              show={showPassword}
              toggle={() => setShowPassword(!showPassword)}
            />

            {/* Confirm Password */}
            <PasswordField
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              show={showConfirmPassword}
              toggle={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-2 text-sm rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
              disabled={!isVerified}
            >
              Register as Nurse
            </button>
          </form>

          <div className="text-center mt-6 text-xs text-gray-600 space-y-1.5 relative">
            <p>
              Already registered?{" "}
              <span
                onClick={() => navigate("/Nurse-login")}
                className="text-blue-600 hover:text-red-600 font-medium cursor-pointer"
              >
                Nurse Login
              </span>
            </p>
            <p>
              Not a nurse?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-blue-600 hover:text-red-600 font-medium cursor-pointer"
              >
                Patient Registration
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// InputField Component
function InputField({ icon, name, value, placeholder, onChange, required = false }) {
  return (
    <div className="mb-3 relative">
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required={required}
      />
      <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-blue-500 text-sm">
        {icon}
      </div>
    </div>
  );
}

// PasswordField Component
function PasswordField({ name, value, onChange, placeholder, show, toggle }) {
  return (
    <div className="mb-3 relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
        minLength={6}
      />
      <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-blue-500 text-sm" />
      <button
        type="button"
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 hover:text-blue-700"
        onClick={toggle}
      >
        {show ? <IoEyeOffOutline size={16} /> : <IoEyeOutline size={16} />}
      </button>
    </div>
  );
}
