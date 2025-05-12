import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Sign-In Success:", user);

      localStorage.setItem('user', JSON.stringify(user));
      navigate('/complete-profile'); // redirect after login
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Google Sign-In failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center">
          <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-blue-600">NurseBuddy</h1>
            <p className="text-gray-600 mt-1 text-sm">Get Our Nurse at your Doorstep</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between">
        <section className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Choose NurseBuddy?</h2>
          <div className="space-y-4">
            {[
              ['Find qualified nurses nearby', '(within 3km radius of your location)'],
              ['Book healthcare services in a few clicks'],
              ['Verified, skilled healthcare professionals'],
              ['Secure payments and ratings system', 'Safe transactions and verified reviews'],
            ].map(([title, subtitle], i) => (
              <div className="flex items-start" key={i}>
                <div className="bg-blue-100 p-1 rounded-full mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{title}</h3>
                  {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="md:w-1/2 bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Login</h2>
          
          </div>

          <p className="text-gray-600 mb-6">Login using your Google account</p>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 flex items-center justify-center gap-2 transition"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
            Continue with Google
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms & Service</a> and{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
          </p>
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

export default Login;
