import { useState } from 'react';
import { Link } from 'react-router-dom';

function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    mobileNumber: '',
    otp: ''
  });

  const [isOTPSent, setIsOTPSent] = useState(false);
  const [isOTPLoading, setIsOTPLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'mobileNumber' ? value.replace(/\D/g, '').slice(0, 10) : value
    }));
  };

  const handleSendOTP = () => {
    setIsOTPLoading(true);
    setTimeout(() => {
      setIsOTPLoading(false);
      setIsOTPSent(true);
      alert(`OTP sent to ${formData.mobileNumber}`);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isOTPSent || formData.otp.length !== 6) {
      alert('Please enter a valid OTP to create your account.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Account created successfully!');
      // redirect or reset form here
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
      {/* Header Section */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-blue-600">NurseBuddy</h1>
              <p className="text-gray-600 mt-1 text-sm">Get Our Nurse at your Doorstep</p>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between">
        <section className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Choose NurseBuddy?</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Certified and experienced nursing staff.</li>
            <li>24/7 Availability across major cities.</li>
            <li>Affordable and transparent pricing.</li>
            <li>Trusted by 10,000+ families.</li>
          </ul>
        </section>

        <section className="md:w-1/2 bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-2">
            <Link to="/login" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
              Login
            </Link>
            <h2 className="text-xl font-semibold text-gray-800">Sign Up</h2>
          </div>

         
          <p className="text-gray-600 mb-8">Create a new account</p>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-4">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Mobile + Send OTP */}
            <div className="mb-6">
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">+91</span>
                  </div>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="9876543210"
                    maxLength="10"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={isOTPLoading || formData.mobileNumber.length !== 10}
                  className={`whitespace-nowrap px-4 py-3 rounded-lg font-medium ${isOTPLoading || formData.mobileNumber.length !== 10 ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                >
                  {isOTPLoading ? 'Sending...' : 'Send OTP'}
                </button>
              </div>
            </div>

            {/* OTP */}
            {isOTPSent && (
              <div className="mb-6">
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                  required
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-medium mb-6 flex items-center justify-center ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Create Account
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              By continuing you agree to our{' '}
              <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and{' '}
              <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
            </p>
          </form>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-6">
        <div className="border-t border-gray-200 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} NurseBuddy. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default SignupPage;
