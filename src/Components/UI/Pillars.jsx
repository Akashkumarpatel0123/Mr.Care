import React from 'react';

const Pillars = () => {
  const pillars = [
    {
      title: "Compassion",
      icon: "❤️",
      description: "We prioritize the dignity and comfort of every patient, delivering nursing care with empathy and kindness.",
      color: "bg-red-50",
      border: "border-red-200"
    },
    {
      title: "Integrity",
      icon: "🛡️",
      description: "Every decision and interaction is guided by transparency and ethical standards to build trust.",
      color: "bg-blue-50",
      border: "border-blue-200"
    },
    {
      title: "Excellence",
      icon: "⭐",
      description: "By adopting the latest medical techniques and best practices, we consistently provide superior care.",
      color: "bg-yellow-50",
      border: "border-yellow-200"
    },
    {
      title: "Innovation",
      icon: "💡",
      description: "Leveraging modern technology, we develop flexible and efficient homecare solutions that redefine healthcare.",
      color: "bg-purple-50",
      border: "border-purple-200"
    },
    {
      title: "Collaboration",
      icon: "🤝",
      description: "Working together with patients, families, nurses, and healthcare professionals is at the heart of our approach to provide holistic and personalized care.",
      color: "bg-green-50",
      border: "border-green-200"
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <img 
          src="https://images.unsplash.com/photo-1579684453423-f84349ef60b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Mr. Care Pillars"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Our Pillars</h1>
            <p className="text-xl text-white">Core Values That Drive Mr. Care</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#8D2E7D] mb-4">
              Foundations of Our Care Philosophy
            </h2>
            <p className="text-xl text-gray-600">
              These five pillars guide every aspect of our service, ensuring we deliver exceptional home healthcare with humanity and professionalism.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {pillars.map((pillar, index) => (
              <div 
                key={index} 
                className={`p-6 rounded-xl shadow-md ${pillar.color} border-t-4 ${pillar.border} hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="text-4xl mb-4">{pillar.icon}</div>
                <h3 className="text-2xl font-bold text-[#8D2E7D] mb-3">{pillar.title}</h3>
                <p className="text-gray-700">{pillar.description}</p>
              </div>
            ))}
            
            {/* Empty card for even grid layout */}
            <div className="hidden lg:block"></div>
          </div>

          {/* Commitment Section */}
          <div className="bg-gradient-to-r from-[#8D2E7D] to-[#FF7043] p-8 rounded-xl text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Our Commitment to You</h3>
            <p className="text-lg mb-6">
              These pillars aren't just words - they're promises we live by every day in our interactions with patients, families, and healthcare partners.
            </p>
            <p className="text-xl font-medium">
              "We measure our success by the trust we earn and the lives we improve."
            </p>
          </div>

          {/* Real-world Application */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-[#8D2E7D] mb-8 text-center">
              How We Bring These Values to Life
            </h3>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/3 bg-blue-50 p-4 rounded-full flex items-center justify-center">
                  <span className="text-5xl">👵</span>
                </div>
                <div className="md:w-2/3">
                  <h4 className="text-xl font-bold text-[#8D2E7D] mb-2">Compassion in Action</h4>
                  <p className="text-gray-700">
                    Our nurses receive special training in empathetic communication and emotional support, particularly for elderly patients and those with chronic conditions.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/3 bg-purple-50 p-4 rounded-full flex items-center justify-center">
                  <span className="text-5xl">📱</span>
                </div>
                <div className="md:w-2/3">
                  <h4 className="text-xl font-bold text-[#8D2E7D] mb-2">Innovation at Work</h4>
                  <p className="text-gray-700">
                    Through our mobile app, patients can track visits, access health records, and communicate with caregivers - bringing transparency to home healthcare.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/3 bg-green-50 p-4 rounded-full flex items-center justify-center">
                  <span className="text-5xl">👨‍⚕️</span>
                </div>
                <div className="md:w-2/3">
                  <h4 className="text-xl font-bold text-[#8D2E7D] mb-2">Collaboration in Practice</h4>
                  <p className="text-gray-700">
                    We maintain close partnerships with hospitals and physicians to ensure continuity of care from clinical settings to patients' homes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pillars;