import RatingStars from './RatingStars';
import ExperienceBadge from './ExperienceBadge';
import VerificationBadge from './VerificationBadge';

const NurseCard = ({ nurse, onBookNow }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="relative">
          <img 
            src={nurse.photo} 
            alt={nurse.name} 
            className="w-20 h-20 rounded-full object-cover"
          />
          <VerificationBadge verified={nurse.verified} />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Dr. {nurse.name}</h3>
          <p className="text-gray-600 text-sm">{nurse.specialization.join(' • ')}</p>
          
          <div className="flex items-center mt-2">
            <RatingStars rating={nurse.rating} />
            <span className="text-gray-500 text-sm ml-1">({nurse.reviews} reviews)</span>
          </div>
          
          <div className="flex items-center mt-1 text-sm">
            <ExperienceBadge years={nurse.experience_years} />
            <span className="text-gray-500 ml-2">• {nurse.procedures_count} IV procedures</span>
          </div>
          
          <div className="mt-2 text-sm">
            <span className="text-gray-700">⏱️ ${nurse.hourly_rate}/hr</span>
            <span className="text-gray-500 mx-2">•</span>
            <span className="text-gray-700">${nurse.daily_rate}/day</span>
          </div>
          
          <div className="mt-1 text-sm text-gray-600">
            📍 {nurse.distance} km away • {nurse.available_now ? 
              <span className="text-green-600">Available Today</span> : 
              <span className="text-blue-600">Available Tomorrow</span>}
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => onBookNow(nurse)}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
      >
        Book Now
      </button>
    </div>
  );
};

export default NurseCard;