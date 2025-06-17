import React from 'react';
import ServiceCard from '../Components/ServiceCard';
import ContactForm from '../Components/ContactForm';
import RequestCallButton from '../Components/RequestCallButton';

const NurseProcedurePage = () => {
  const services = [
    {
      id: 'ryles-tube',
      title: "Ryle's Tube Insertion",
      image: 'https://images.pexels.com/photos/3279196/pexels-photo-3279196.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      description: "Ryle's tube प्रविष्टि एक नाक के माध्यम से भोजन, दवा और ड्रेनेज प्रदान करती है।",
      price: '1,500',
      tag: 'Best Seller',
      tagColor: 'bg-[#FF7043]',
      cta: 'Book Now'
    },
    {
      id: 'wound-dressing',
      title: 'Wound Dressing',
      image: 'https://images.pexels.com/photos/5726706/pexels-photo-5726706.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      description: 'घाव की ड्रेसिंग उपचार को बढ़ावा देती है और बैक्टीरिया से सुरक्षा करती है।',
      price: '',
      tag: 'Enquire Now',
      tagColor: 'bg-[#FF7043]',
      cta: 'Book Now'
    },
    {
      id: 'ecg',
      title: 'ECG at Home',
      image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      description: "Mr.care की नर्सें पेशेवरता और देखभाल के साथ घर पर ईसीजी सेवा प्रदान करने में महत्वपूर्ण भूमिका निभाती हैं।",
      price: '',
      tag: 'Enquire Now',
      tagColor: 'bg-[#FF7043]',
      cta: 'Book Now'
    },
    {
      id: 'iv-injection',
      title: 'IV INJECTION',
      image: './image12.jpg',
      description: 'IV इंजेक्शन दवा को सीधे रक्तप्रवाह में पहुंचाता है।',
      price: '1,500',
      tag: 'Most Trusted',
      tagColor: 'bg-[#FF7043]',
      cta: 'Book Now'
    },
    {
      id: 'im-injection',
      title: 'IM( intra muscular) Injection',
      image: './image11.jpg',
      description: 'IM( intra muscular) Injection मांसपेशियों में दवा का इंजेक्शन होता है।',
      price: '1,500',
      tag: 'Book Now',
      tagColor: 'bg-[#FF7043]',
      cta: 'Book Now'
    },
    {
      id: 'grbs',
      title: 'General Random Blood Sugar (GRBS),BP',
      image: 'https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg',
      description: 'GRBS टेस्ट रक्त शर्करा के स्तर की निगरानी करता है ताकि मधुमेह का प्रभावी प्रबंधन किया जा सके।',
      price: '1,000',
      tag: 'Best Seller',
      tagColor: 'bg-[#FF7043]',
      cta: 'Book Now'
    },
    {
      id: 'sc-injection',
      title: 'All vaccination',
      image: './image6.jpg',
      description: 'Mr.Care Homecare offers All vaccination इंजेक्शन्स और विभिन्न प्रकार के टीकाकरण की सेवाएं प्रदान करता है।',
      price: '1,200',
      tag: 'Best Seller',
      tagColor: 'bg-[#FF7043]',
      cta: 'Book Now'
    },
    {
      id: 'iv-infusion',
      title: 'IV INFUSION (Cannula already in place)',
      image: './image7.jpg',
      description: 'पूर्व-स्थापित कैन्यूला के साथ IV infusion . (Rs.250/Hr for extra hours)',
      price: '1,500',
      tag: 'Best Seller',
      tagColor: 'bg-[#FF7043]',
      cta: 'Book Now'
    },
    {
      id: 'iv-cannula',
      title: 'I/V Cannula Insertion For Antibiotics',
      image: 'https://images.pexels.com/photos/7088530/pexels-photo-7088530.jpeg',
      description: 'तेज़ और अधिक प्रभावी उपचार के लिए कैन्यूला के माध्यम से एंटीबायोटिक्स दिए जाते हैं।',
      price: '1,500',
      tag: 'Most Trusted',
      tagColor: 'bg-[#FF7043]',
      cta: 'Book Now'
    },
    {
      id: 'enema',
      title: 'Enema',
      image: 'https://images.pexels.com/photos/7088532/pexels-photo-7088532.jpeg',
      description: 'Enema procedure आंतों की सफाई, कब्ज से राहत या चिकित्सीय तैयारी के लिए की जाती है।',
      price: '1,500',
      tag: 'Best Seller',
      tagColor: 'bg-[#FF7043]',
      cta: 'Book Now'
    },
    {
      id: 'suture-removal',
      title: 'Suture/stitches 🪡 Removal',
      image: './image8.jpg',
      description: 'Suture removal with expert care, using specialized tools for safety.',
      price: '2,000',
      tag: 'Best Seller',
      tagColor: 'bg-[#FF7043]',
      cta: 'Book Now'
    },
    {
      id: 'colostomy',
      title: 'Colostomy Bag Change',
      image: 'https://images.pexels.com/photos/7088536/pexels-photo-7088536.jpeg',
      description: 'विशेष उपकरणों का उपयोग करके, विशेषज्ञ देखभाल के साथ टांकों को हटाया जाता है ताकि सुरक्षा सुनिश्चित की जा सके।',
      price: '2,000',
      tag: 'Best Seller',
      tagColor: 'bg-[#FF7043]',
      cta: 'Book Now'
    },
    {
      id: 'foley-cath',
      title: 'Foley Cath Insertion',
      image: 'https://images.pexels.com/photos/7088538/pexels-photo-7088538.jpeg',
      description: 'फोले कैथेटर प्रविष्टि आरामदायक तरीके से उचित मूत्र प्रबंधन सुनिश्चित करती है।',
      price: '2,200',
      tag: 'Best Seller',
      tagColor: 'bg-[#FF7043]',
      cta: 'Book Now'
    },
    {
      id: 'abg',
      title: 'ABG Collection',
      image: './image9.jpg',
      description: 'सटीक निदान के लिए पेशेवर रूप से आर्टेरियल ब्लड गैस (ABG) संग्रह किया जाता है।',
      price: '2,500',
      tag: 'Most Trusted',
      tagColor: 'bg-[#FF7043]',
      cta: 'Book Now'
    },
    {
      id: 'chemo-port',
      title: 'Chemo-Port',
      image: './image10.jpg',
      description: 'Chemotherapy Port रखरखाव और पहुँच के लिए विशेषज्ञ देखभाल।',
      tag: 'Book Now',
      tagColor: 'bg-[#FF7043]',
      cta: 'Book Now'
    },
    {
      id: 'iv-fluids',
      title: 'Iv fluids',
      image: './image3.jpg',
      description: 'शरीर में पानी, इलेक्ट्रोलाइट्स, पोषक तत्व या दवाइयां देने के लिए इस्तेमाल',
      tag: 'Book Now',
      tagColor: 'bg-[#FF7043]',
      cta: 'Book Now'
    },
    {
      id: 'Icu-specialist',
      title: 'Icu specialist',
      image: './image4.jpg',
      description: 'Icu specialistगंभीर एवं संकटापन्न मरीजों का चिकित्सा करते हैं।',
      tag: 'Book Now',
      tagColor: 'bg-[#FF7043]',
      cta: 'Book Now'
    },
    {
      id: 'NICU-specialist',
      title: 'NICU specialist',
      image: './image5.jpg',
      description: 'NICU specialist वजात शिशुओं की विशेष देखभाल करते हैं।',
      tag: 'Book Now',
      tagColor: 'bg-[#FF7043]',
      cta: 'Book Now'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://wa.me/917903268015" // Replace with your WhatsApp number
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-all"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="w-8 h-8"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.515 5.392 1.521 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </a>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 md:p-8 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Nurse Procedure Services</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Professional nursing care delivered to your doorstep. Our certified nurses provide a wide range of medical procedures with compassion and expertise.
        </p>
      </div>

      {/* Services Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Our Nursing Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              image={service.image}
              description={service.description}
              price={service.price}
              tag={service.tag}
              tagColor={service.tagColor}
              cta={service.cta}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full"
            />
          ))}
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">About Our Nurse Procedures</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-blue-600">What are Nurse Procedures?</h3>
            <p className="text-gray-700 mb-4">
              Traveling while unwell can increase health risks and complications. To ensure safety and convenience, services like wound care and urinary catheterization are now available in the comfort of your home with our Nurse procedures.
            </p>
            <p className="mb-4">
              <span className="font-semibold">Our Nurse procedures</span> involve specialized medical care provided by trained nurses to manage a range of healthcare needs. These include:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                Wound dressing, ECG, colostomy Bag change, Suture Removal, Ryles, GRBS, ABG Collection, S/C Injection, Enema, I/V cannula for antibiotics, IV Injection, IV Infusion, Foley catherine, Post-Surgical Care, Vital Sign Monitoring
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Importance of Nurse Procedures</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Convenient - Care at your doorstep",
                "Safe Recovery - Professional monitoring",
                "Personalized Care - Tailored to your needs",
                "Cost-Effective - Avoid hospital visits",
                "Comfort - Recover in familiar surroundings",
                "Emotional Support - Compassionate care"
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Why Choose Us</h3>
            <ol className="space-y-3">
              {[
                "Highly Trained Nurses with extensive experience",
                "Comprehensive Care for all your medical needs",
                "Advanced Techniques using modern equipment",
                "Personalized Attention to each patient",
                "24/7 Support for emergencies",
                "Trusted Legacy of quality healthcare"
              ].map((item, index) => (
                <li key={index} className="flex">
                  <span className="bg-blue-100 text-blue-800 font-bold rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ol>
          </div>

          <p className="text-gray-700 italic">
            With our nurse procedures, you receive expert care that prioritizes your comfort, recovery, and peace of mind—all delivered directly to your home.
          </p>

          <div className="flex justify-center mt-6">
            <RequestCallButton className="px-8 py-3 text-lg" />
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Book a Service</h2>
        <ContactForm />
      </div>
    </div>
  );
};

export default NurseProcedurePage;