import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { FaEnvelope, FaLock, FaTimes } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function NurseLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSkipLogin = () => {
    console.log("Skip button clicked");
    navigate("/login", { replace: true }); 
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const res = await axios.post("http://localhost:10000/api/auth/nurse-login", {
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("userData", JSON.stringify(res.data.user));
        login(res.data.user);
        navigate("/nurse-kyc", { replace: true });
      }
    } catch (error) {
      console.error("Nurse Login API error:", error);
      const msg = error.response?.data?.message || "Login failed. Please try again.";
      setErrorMsg(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex justify-center items-center p-4">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-bl-full opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500 rounded-tr-full opacity-20"></div>

      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md relative overflow-hidden">
        <button
          onClick={handleSkipLogin}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-500 transition-colors z-20"
          aria-label="Skip login"
        >
          <FaTimes className="text-lg" />
        </button>

        <div className="p-6 pt-12">
          <div className="text-center mb-6 relative z-10">
            <h1 className="text-2xl font-bold text-blue-800">
              Mr.<span className="text-teal-600">Care</span> Nurse
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Professional Healthcare Services
            </p>
          </div>

          <form onSubmit={handleLogin}>
            {errorMsg && (
              <p className="text-sm text-red-600 mb-2 text-center">{errorMsg}</p>
            )}

            <div className="mb-3 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your nurse email"
                className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-blue-500 text-sm" />
            </div>

            <div className="mb-3 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-9 pr-8 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-blue-500 text-sm" />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 hover:text-blue-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <IoEyeOffOutline size={16} />
                ) : (
                  <IoEyeOutline size={16} />
                )}
              </button>
            </div>

            <div className="text-right mb-4">
              <span 
                onClick={() => navigate("/nurse-forgot-password")}
                className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Forgot Password?
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-2 text-sm rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
            >
              Nurse Log In
            </button>
          </form>

          <div className="text-center mt-6 text-xs text-gray-600 space-y-1.5 relative">
            <p>
              Not a nurse?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:text-red-600 font-medium cursor-pointer"
              >
                Patient Login
              </span>
            </p>
            <p>
              New to Mr.Care?{" "}
              <span
                onClick={() => navigate("/Nurse-signup")}
                className="text-blue-600 hover:text-red-600 font-medium cursor-pointer"
              >
                Register as Nurse
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}