import React from 'react';

const Vision = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <img 
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Mr. Care Vision"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Our Vision</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Bilingual Vision Statement */}
          <div className="text-center mb-16">
            <div className="bg-[#F8F5F9] p-8 rounded-lg mb-8">
              <h2 className="text-3xl font-bold text-[#8D2E7D] mb-6">Mr. Care Vision Statement</h2>
              
              <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
                <p className="text-xl leading-relaxed text-gray-800 italic mb-4">
                  "Humara lakshya hai healthcare ko har ghar tak le jana, jahan patients ko mil sake reliable, compassionate, aur professional nursing care."
                </p>
                <p className="text-xl leading-relaxed text-gray-800 italic">
                  "Mr. Care ke zariye, hum har vyakti ko ghar baithe hi advanced aur personalized medical assistance provide karna chahte hain, taaki unki sehat aur zindagi behtar ho sake."
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <p className="text-xl leading-relaxed text-gray-800 mb-4">
                  "Our mission is to bring healthcare to every home, where patients can receive reliable, compassionate, and professional nursing care."
                </p>
                <p className="text-xl leading-relaxed text-gray-800">
                  "Through Mr. Care, we want to provide every individual with advanced and personalized medical assistance from their homes, so their health and life can improve."
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#8D2E7D] to-[#FF7043] p-8 rounded-lg text-white">
              <p className="text-2xl font-medium mb-4">
                "We believe quality healthcare is everyone's right, and making it accessible, affordable, and convenient is our responsibility."
              </p>
              <p className="text-xl">
                "Hum believe karte hain ki quality healthcare sabka haq hai, aur ise accessible, affordable, aur convenient banana hamari zimmedari."
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#8D2E7D] mb-8 text-center">Our Core Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Compassion",
                  icon: "❤️",
                  description: "We treat every patient with the care and respect we would want for our own family members."
                },
                {
                  title: "Excellence",
                  icon: "⭐",
                  description: "We maintain the highest standards of medical care through continuous training and quality checks."
                },
                {
                  title: "Accessibility",
                  icon: "🌍",
                  description: "We break barriers to make quality healthcare available to all, regardless of location or economic status."
                },
                {
                  title: "Innovation",
                  icon: "💡",
                  description: "We leverage technology to create smarter healthcare solutions for India's unique needs."
                },
                {
                  title: "Trust",
                  icon: "🤝",
                  description: "We build relationships through transparency, reliability, and ethical practices."
                },
                {
                  title: "Community",
                  icon: "👨‍👩‍👧‍👦",
                  description: "We believe healthcare improves when we work together - patients, families, and caregivers."
                }
              ].map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#8D2E7D]">
                  <div className="text-3xl mb-3">{value.icon}</div>
                  <h3 className="text-xl font-bold text-[#8D2E7D] mb-2">{value.title}</h3>
                  <p className="text-gray-700">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Vision in Action */}
          <div className="bg-[#F0F7FF] p-8 rounded-lg mb-12">
            <h2 className="text-3xl font-bold text-[#8D2E7D] mb-6 text-center">Our Vision in Action</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-blue-700">Today</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Providing certified nurses for home care across multiple cities</li>
                  <li>Tech-enabled platform for easy booking and tracking</li>
                  <li>Affordable pricing models for different economic segments</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3 text-blue-700">Tomorrow</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>AI-powered health monitoring and predictive care</li>
                  <li>Expansion to 100+ cities with vernacular support</li>
                  <li>Integrated telemedicine and diagnostic services</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Closing Promise */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#8D2E7D] mb-4">The Mr. Care Promise</h3>
            <p className="text-xl leading-relaxed text-gray-700 mb-6">
              We commit to making quality home healthcare a reality for every Indian family - 
              delivered with professionalism, compassion, and technological innovation.
            </p>
            <p className="text-lg text-gray-600">
              "Ek sehatmand kal ki shuruaat, har ghar se"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vision;