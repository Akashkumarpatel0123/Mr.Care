import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import { FaEnvelope, FaLock, FaTimes } from "react-icons/fa";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const { login, user } = useContext(AuthContext); // ✅ includes user

  // ✅ Only redirect if already logged in via user context
  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [user, navigate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "signup") {
      navigate("/signup");
    }
  };

  const handleSignUpClick = () => navigate("/signup");
  const handleHereClick = () => navigate("/Nurse-login");
  const handleSkipLogin = () => navigate("/", { replace: true });

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const res = await axios.post("http://localhost:10000/api/auth/login", {
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("userData", JSON.stringify(res.data.user));
        login(res.data.user); // ✅ update global context
        navigate("/home", { replace: true }); // ✅ redirect after login
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Login failed. Try again.";
      setErrorMsg(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex justify-center items-center p-4">
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 rounded-bl-full opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-500 rounded-tr-full opacity-20"></div>

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
            <h1 className="text-2xl font-bold text-purple-800">
              Mr.<span className="text-green-600">Care</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Your Health, Our Responsibility
            </p>
          </div>

          <div className="flex justify-center mb-6 bg-gray-100 rounded-full p-1 relative">
            <button
              className={`px-5 py-1.5 text-sm rounded-full transition-all relative z-10 ${
                activeTab === "login"
                  ? "bg-purple-700 text-white shadow-md"
                  : "text-purple-700"
              }`}
              onClick={() => handleTabChange("login")}
            >
              Log In
            </button>
            <button
              className={`px-5 py-1.5 text-sm rounded-full transition-all relative z-10 ${
                activeTab === "signup"
                  ? "bg-purple-700 text-white shadow-md"
                  : "text-purple-700"
              }`}
              onClick={() => handleTabChange("signup")}
            >
              Sign Up
            </button>
          </div>

          {activeTab === "login" && (
            <form onSubmit={handleLogin}>
              {errorMsg && (
                <p className="text-sm text-red-600 mb-2 text-center">{errorMsg}</p>
              )}

              <div className="mb-3 relative">
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

              <div className="mb-3 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
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

              <div className="text-right mb-4">
                <span
                  onClick={() => navigate("/forgot-password")}
                  className="text-xs text-purple-600 hover:text-purple-800 cursor-pointer"
                >
                  Forgot Password?
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2 text-sm rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
              >
                Log In
              </button>
            </form>
          )}

          <div className="text-center mt-6 text-xs text-gray-600 space-y-1.5 relative">
            <p>
              Join as a Part-Time Nurse?{" "}
              <span
                onClick={handleHereClick}
                className="text-purple-600 hover:text-red-600 font-medium cursor-pointer"
              >
                Here
              </span>
            </p>
            <p>
              Create an Account for Mr.Care?{" "}
              <span
                onClick={handleSignUpClick}
                className="text-purple-600 hover:text-red-600 font-medium cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
