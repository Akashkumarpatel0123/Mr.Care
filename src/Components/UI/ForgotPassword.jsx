import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock, FaTimes } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = "http://localhost:10000/api/auth";

  // Timer effect
  React.useEffect(() => {
    let timer;
    if (step === 2 && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= minLength && hasNumber && hasSpecialChar;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    if (!validateEmail(email)) {
      setErrorMsg("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/send-otp`, {
        email: email.trim().toLowerCase()
      });
      
      setSuccessMsg(`OTP sent to ${email}`);
      setStep(2);
      setTimeLeft(300);
    } catch (error) {
      console.error("OTP send error:", error);
      const msg = error.response?.data?.message || "Failed to send OTP. Please try again.";
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    if (!otp || otp.length !== 6) {
      setErrorMsg("OTP must be 6 digits");
      setIsLoading(false);
      return;
    }

    if (timeLeft <= 0) {
      setErrorMsg("OTP has expired. Please request a new one.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/verify-reset-otp`, {
        email: email.trim().toLowerCase(),
        otp
      });
      
      setSuccessMsg("OTP verified successfully");
      setStep(3);
    } catch (error) {
      console.error("OTP verification error:", error);
      const msg = error.response?.data?.message || "OTP verification failed. Please try again.";
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    if (!newPassword || !confirmPassword) {
      setErrorMsg("All fields are required");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!validatePassword(newPassword)) {
      setErrorMsg("Password must be at least 8 characters with one number and one special character");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/reset-password`, {
        email: email.trim().toLowerCase(),
        otp,
        newPassword
      });
      
      setSuccessMsg("Password reset successful! You can now login with your new password.");
      setStep(4);
    } catch (error) {
      console.error("Password reset error:", error);
      const msg = error.response?.data?.message || "Password reset failed. Please try again.";
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/resend-otp`, {
        email: email.trim().toLowerCase()
      });
      
      setSuccessMsg(`OTP resent to ${email}`);
      setTimeLeft(300);
    } catch (error) {
      console.error("OTP resend error:", error);
      const msg = error.response?.data?.message || "Failed to resend OTP. Please try again.";
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex justify-center items-center p-4">
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 rounded-bl-full opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-500 rounded-tr-full opacity-20"></div>

      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md relative overflow-hidden">
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-500 transition-colors z-20"
          aria-label="Skip"
        >
          <FaTimes className="text-lg" />
        </button>

        <div className="p-6 pt-12">
          <div className="text-center mb-6 relative z-10">
            <h1 className="text-2xl font-bold text-purple-800">
              Reset Password
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {step === 1 && "Enter your email to receive OTP"}
              {step === 2 && "Enter the 6-digit OTP sent to your email"}
              {step === 3 && "Create your new password"}
              {step === 4 && "Password reset successful"}
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="bg-green-100 text-green-700 p-2 rounded mb-4 text-sm text-center">
              {successMsg}
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleSendOtp}>
              <div className="mb-4 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-500 text-sm" />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2 text-sm rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp}>
              <div className="mb-4 relative">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  maxLength="6"
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-3 py-2 text-center text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <div className="text-xs text-center mt-1">
                  {timeLeft > 0 ? (
                    <span className="text-gray-500">
                      OTP expires in {Math.floor(timeLeft / 60)}:
                      {String(timeLeft % 60).padStart(2, '0')}
                    </span>
                  ) : (
                    <span className="text-red-500">OTP expired</span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2 text-sm rounded-lg hover:shadow-lg transition-all duration-300 font-medium mb-2"
                disabled={isLoading || timeLeft <= 0}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                className="w-full text-purple-600 text-xs py-1 hover:text-purple-800 transition-colors"
                disabled={isLoading}
              >
                Didn't receive code? Resend OTP
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword}>
              <div className="mb-3 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full pl-9 pr-8 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-500 text-sm" />
                <button
                  type="button"
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 hover:text-purple-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <IoEyeOffOutline size={16} />
                  ) : (
                    <IoEyeOutline size={16} />
                  )}
                </button>
              </div>

              <div className="mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full pl-9 pr-8 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-purple-500 text-sm" />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2 text-sm rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

          {step === 4 && (
            <div className="text-center">
              <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
                {successMsg}
              </div>
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2 text-sm rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
              >
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}