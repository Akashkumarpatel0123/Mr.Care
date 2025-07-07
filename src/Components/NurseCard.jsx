import { useNavigate } from 'react-router-dom';

const NurseCard = ({ nurse }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/nurse-detail', { state: { nurse } });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-100 hover:shadow-lg transition-shadow">
      {/* existing content */}
      <div className="group">
        <button
          onClick={handleBookNow}
          className="mt-4 w-full bg-gradient-to-r from-[#8D2E7D] to-[#C44594] group-hover:from-[#C44594] group-hover:to-[#8D2E7D] text-white py-2 px-4 rounded-md transition-all duration-300"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default NurseCard;
