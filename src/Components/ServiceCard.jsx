import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({
  id,
  title,
  image,
  description,
  price,
  tag,
  tagColor = 'bg-[#FF7043]',
  cta
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (id === 'iv-injection') {
      navigate('/IVInjection'); // Make sure this route exists in your App.jsx
    }
    // Add more conditions for other services if needed
      if (id === 'ryles-tube') {
      navigate('/ryles-tube'); // Make sure this route exists in your App.jsx
    }
    if (id === 'wound-dressing') {
      navigate('/wound-dressing'); // Make sure this route exists in your App.jsx
    }
    if (id === 'ecg') {
      navigate('/ecg'); // Make sure this route exists in your App.jsx
    }
    if (id === 'grbs') {
      navigate('/grbs'); // Make sure this route exists in your App.jsx
    }
    if (id === 'sc-injection') {
      navigate('/sc-injection'); // Make sure this route exists in your App.jsx
    }
    if (id === 'iv-infusion') {
      navigate('/iv-infusion'); // Make sure this route exists in your App.jsx
    }
    if (id === 'iv-cannula') {
      navigate('/iv-cannula'); // Make sure this route exists in your App.jsx
    }
    if (id === 'im-injection') {
      navigate('/im-injection'); // Make sure this route exists in your App.jsx
    }
    if (id === 'enema') {
      navigate('/enema'); // Make sure this route exists in your App.jsx
    }
    if (id === 'suture-removal') {
      navigate('/suture-removal'); // Make sure this route exists in your App.jsx
    }
    if (id === 'colostomy') {
      navigate('/colostomy'); // Make sure this route exists in your App.jsx
    }
    if (id === 'foley-cath') {
      navigate('/foley-cath'); // Make sure this route exists in your App.jsx
    }
    if (id === 'abg') {
      navigate('/abg'); // Make sure this route exists in your App.jsx
    }
    if (id === 'chemo-port') {
      navigate('/chemo-port'); // Make sure this route exists in your App.jsx
    }
    if (id === 'iv-fluids') {
      navigate('/iv-fluids'); // Make sure this route exists in your App.jsx
    }
    if (id === 'Icu-specialist') {
      navigate('/Icu-specialist'); // Make sure this route exists in your App.jsx
    }
    if (id === 'NICU-specialist') {
      navigate('/NICU-specialist'); // Make sure this route exists in your App.jsx
    }
    
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        {tag && (
          <div className={`absolute top-2 left-2 ${tagColor} text-white px-3 py-1 rounded-sm`}>
            {tag}
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 flex-grow text-sm">
          {description}
        </p>
        
        <div className="mt-auto flex justify-between items-center">
          {price && (
            <span className="text-2xl font-bold">₹{price}</span>
          )}
          <button 
            onClick={handleClick}
            className="bg-[#00A0A0] text-white px-4 py-2 rounded-sm hover:bg-[#008080] transition duration-300"
          >
            {cta}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
