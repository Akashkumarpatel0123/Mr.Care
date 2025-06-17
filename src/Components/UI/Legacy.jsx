import React from 'react';
import { ChevronRight } from 'lucide-react';

const Legacy = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <img 
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Mr. Care Legacy"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Our Legacy & Vision</h1>
        </div>
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-[#8D2E7D] mb-8">Pioneering Home Healthcare Since 2025</h2>
          
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1581595219315-a187dd40c322?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Mr. Care Team"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <p className="text-lg leading-relaxed mb-6">
                Mr. Care is a pioneering digital healthcare solution designed to address the growing need for accessible and reliable in-home nursing services. The platform was conceptualized with a vision to simplify the process of booking trained medical professionals for personalized, at-home patient care.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                मिस्टर केयर एक अग्रणी डिजिटल हेल्थकेयर समाधान है जिसे सुलभ और विश्वसनीय इन-होम नर्सिंग सेवाओं की बढ़ती ज़रूरत को पूरा करने के लिए डिज़ाइन किया गया है। इस प्लेटफ़ॉर्म की संकल्पना व्यक्तिगत, घर पर रोगी देखभाल के लिए प्रशिक्षित चिकित्सा पेशेवरों की बुकिंग की प्रक्रिया को सरल बनाने के उद्देश्य से की गई थी।
              </p>
            </div>
          </div>

          <div className="bg-[#F8F5F9] p-8 rounded-lg mb-12">
            <h3 className="text-2xl font-bold text-[#8D2E7D] mb-4">🩺 The Mr. Care Advantage</h3>
            <p className="text-lg leading-relaxed mb-4">
              Mr. Care brings compassionate, professional nursing services right to your doorstep. Whether it's elderly care, post-operative recovery, or daily medical assistance, Mr. Care offers personalized, reliable, and affordable in-home care—delivered by certified healthcare professionals who understand the value of healing in a familiar environment.
            </p>
          </div>

          {/* Expansion Plan Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-[#8D2E7D] mb-6 text-center">📍 Phase-Wise Expansion Plan</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Phase 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                <div className="text-xl font-bold text-blue-600 mb-3">Phase 1: Local City Launch</div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Focus on 1–2 tier-1 cities (Delhi, Mumbai, Bangalore)</li>
                  <li>Partner with certified local nurses and homecare agencies</li>
                  <li>Build trust with strong referral and review system</li>
                </ul>
              </div>
              
              {/* Phase 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                <div className="text-xl font-bold text-green-600 mb-3">Phase 2: Tier-2 & Tier-3 Cities</div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Expand to underserved areas with limited hospital access</li>
                  <li>Offer vernacular language support</li>
                  <li>Localized pricing models</li>
                </ul>
              </div>
              
              {/* Phase 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500">
                <div className="text-xl font-bold text-purple-600 mb-3">Phase 3: Pan-India Coverage</div>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Add physiotherapy, doctor-on-call, diagnostics</li>
                  <li>Collaborate with hospitals and insurance providers</li>
                  <li>Launch Android/iOS app with real-time tracking</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Future Possibilities Section */}
          <div className="mb-12 bg-[#F0F7FF] p-8 rounded-lg">
            <h3 className="text-3xl font-bold text-[#8D2E7D] mb-6 text-center">🌍 Future Possibilities</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl font-semibold mb-3 text-blue-700">Technology Integration</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Telemedicine: Video consultations for remote areas</li>
                  <li>Health Monitoring: Smart devices for chronic patients</li>
                  <li>AI-Based Nurse Matching system</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-3 text-blue-700">Business Growth</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Subscription-based homecare plans</li>
                  <li>Franchise model for nurse-preneurs</li>
                  <li>Corporate wellness partnerships</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="text-center p-8 bg-gradient-to-r from-[#8D2E7D] to-[#FF7043] rounded-lg text-white">
            <h3 className="text-3xl font-bold mb-4">🧭 Our Vision Ahead</h3>
            <p className="text-xl leading-relaxed">
              Mr. Care envisions becoming India's most trusted home healthcare platform, empowering families to access compassionate care with just one tap — no matter where they live.
            </p>
            <p className="text-lg mt-4">
              "Healing at Home, Nationwide"
            </p>
          </div>

          {/* Milestones Section */}
          <div className="mt-12">
            <h3 className="text-3xl font-bold text-[#8D2E7D] mb-6 text-center">Our Milestones</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  year: "2025", 
                  title: "Foundation", 
                  description: "Launched Mr. Care Services in Bihar with focus on quality home healthcare" 
                },
                { 
                  year: "2025-26", 
                  title: "Growth Phase", 
                  description: "As demand for personalized in-home healthcare rises, Mr. Care is poised for scalable growth and multi-city expansion." 
                },
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#8D2E7D]">
                  <div className="text-2xl font-bold text-[#8D2E7D] mb-2">{item.year}</div>
                  <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legacy;