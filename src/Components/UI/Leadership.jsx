import React from 'react';

const Leadership = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative h-96 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Mr. Care Leadership"
            className="w-full h-full object-cover object-center scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-5xl font-bold text-white mb-4">Our Leadership</h1>
              <p className="text-xl text-white max-w-2xl mx-auto">
                Meet the visionary team guiding Mr. Care's mission to transform healthcare delivery
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-[#8D2E7D] mb-6">
              <span className="inline-block mr-3">👨‍⚕️</span> Leadership at Mr. Care
            </h2>
            <p className="text-xl leading-relaxed text-gray-700 max-w-3xl mx-auto">
              We believe that visionary leadership drives innovation, compassion, and impactful healthcare delivery. 
              Our leadership team brings together expertise across clinical excellence, strategic operations, 
              financial discipline, and global healthcare best practices.
            </p>
          </div>

          {/* Board of Directors */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-[#8D2E7D] mb-10 text-center pb-3 relative">
              <span className="inline-block mr-2">🧑‍⚕️</span> Board of Directors
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#8D2E7D] rounded-full"></span>
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Akash Kumar Patel */}
              <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row items-start mb-6">
                  <div className="relative mb-4 sm:mb-0 sm:mr-6">
                    <img 
                      src="../image14.jpg" 
                      alt="Akash Kumar Patel"
                      className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800">Akash Kumar Patel</h4>
                    <p className="text-gray-600 font-medium mb-2">Joint Managing Director</p>
                    <div className="flex space-x-2">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Technology</span>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Innovation</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-5 leading-relaxed">
                  A passionate and forward-thinking software developer, Akash Kumar Patel is dedicated to building scalable, user-centric digital solutions that address real-world challenges. A graduate from Amity University, Patna, he combines academic strength with practical skills in full-stack development, cloud computing, and AI integration.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Driven by innovation and problem-solving with experience in MERN stack, RESTful APIs, and Firebase authentication</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Collaborates on cross-functional teams to deliver high-performance web and mobile applications</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Actively contributes to open-source projects and tech communities</span>
                  </li>
                </ul>
              </div>

              {/* Mr. Ujjawal Kumar */}
              <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col sm:flex-row items-start mb-6">
                  <div className="relative mb-4 sm:mb-0 sm:mr-6">
                    <img 
                      src="../image13.jpg" 
                      alt="Mr. Ujjawal Kumar"
                      className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-800">Mr. Ujjawal Kumar</h4>
                    <p className="text-gray-600 font-medium mb-2">Director, Brand Strategy Consultant</p>
                    <div className="flex space-x-2">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Marketing</span>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Strategy</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-5 leading-relaxed">
                  A dynamic and versatile thinker, Mr. Ujjawal Kumar brings a unique blend of healthcare knowledge and emerging marketing strategy insights. Currently pursuing his degree at Ambedkar College of Education, he leverages his two years of pharmacy experience to craft authentic, research-driven brand strategies.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Strategizing brand positioning and digital engagement for a next-gen healthcare and food delivery platform</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Applies real-world healthcare insights to shape customer-centric marketing campaigns</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Passionate about fusing wellness, education, and innovation to drive grassroots brand growth</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Leadership Team */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-[#8D2E7D] mb-10 text-center pb-3 relative">
              <span className="inline-block mr-2">👥</span> Mr. Care Leadership Team
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#8D2E7D] rounded-full"></span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Vishal Lathwal */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-blue-400">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">Vishal Lathwal</h4>
                    <p className="text-gray-600 font-medium">Chief Executive Officer (CEO)</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  With over 16 years of cross-sector experience, Vishal Lathwal is steering Mr. Care with strategic vision 
                  and operational excellence.
                </p>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 mb-2">Prior Experience:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white text-blue-800 text-xs px-3 py-1 rounded-full shadow-sm">Max Healthcare</span>
                    <span className="bg-white text-blue-800 text-xs px-3 py-1 rounded-full shadow-sm">Mercedes-Benz</span>
                    <span className="bg-white text-blue-800 text-xs px-3 py-1 rounded-full shadow-sm">Mercer</span>
                  </div>
                </div>
              </div>

              {/* Mr. Mudassir Mehdi */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-green-400">
                <div className="flex items-start mb-4">
                  <div className="bg-green-100 p-2 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">Mr. Mudassir Mehdi</h4>
                    <p className="text-gray-600 font-medium">Vice President – Finance & Accounts</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  A Chartered Accountant with vast experience in corporate finance, Mr. Mehdi brings accountability 
                  and financial transparency to Mr. Care.
                </p>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-green-800 mb-2">Prior Experience:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white text-green-800 text-xs px-3 py-1 rounded-full shadow-sm">MMTC</span>
                    <span className="bg-white text-green-800 text-xs px-3 py-1 rounded-full shadow-sm">Satyam</span>
                    <span className="bg-white text-green-800 text-xs px-3 py-1 rounded-full shadow-sm">Wockhardt</span>
                    <span className="bg-white text-green-800 text-xs px-3 py-1 rounded-full shadow-sm">Dr. Reddy's Foundation</span>
                  </div>
                </div>
              </div>

              {/* Ms. Swetha Tada */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-purple-400">
                <div className="flex items-start mb-4">
                  <div className="bg-purple-100 p-2 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">Ms. Swetha Tada</h4>
                    <p className="text-gray-600 font-medium">Vice President – Service Delivery</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  With over 17 years of nursing expertise in India and abroad, Swetha Tada ensures that the nursing 
                  standards on Mr. Care are globally benchmarked.
                </p>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-purple-800 mb-2">Key Contributions:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white text-purple-800 text-xs px-3 py-1 rounded-full shadow-sm">Joint Commission Accreditation</span>
                    <span className="bg-white text-purple-800 text-xs px-3 py-1 rounded-full shadow-sm">Patient Satisfaction</span>
                    <span className="bg-white text-purple-800 text-xs px-3 py-1 rounded-full shadow-sm">Global Standards</span>
                  </div>
                </div>
              </div>

              {/* Dr. Sai Kumar */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-red-400">
                <div className="flex items-start mb-4">
                  <div className="bg-red-100 p-2 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">Dr. Sai Kumar</h4>
                    <p className="text-gray-600 font-medium">Head of Medical Services</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  An accomplished physician with global credentials from the U.S. and U.K., Dr. Sai Kumar brings clinical 
                  integrity and innovation to our platform.
                </p>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-red-800 mb-2">Achievements:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-white text-red-800 text-xs px-3 py-1 rounded-full shadow-sm">Critical Care Specialist</span>
                    <span className="bg-white text-red-800 text-xs px-3 py-1 rounded-full shadow-sm">FICCI Recognition</span>
                    <span className="bg-white text-red-800 text-xs px-3 py-1 rounded-full shadow-sm">Remote Care Pioneer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Promise */}
          <div className="bg-gradient-to-r from-[#8D2E7D] to-[#FF7043] p-10 rounded-2xl text-white text-center transform hover:scale-[1.01] transition-transform duration-300 shadow-xl">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white bg-opacity-20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-6">Our Promise</h3>
              <p className="text-xl leading-relaxed mb-6">
                With a leadership team grounded in experience, empathy, and execution, Mr. Care is committed to 
                transforming home healthcare in India—ensuring every family gets access to safe, skilled, and 
                human-centered nursing services, anytime, anywhere.
              </p>
              <button className="bg-white text-[#8D2E7D] font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-md">
                Meet Our Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leadership;