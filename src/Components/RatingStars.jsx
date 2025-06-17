const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-xl ${
          i < fullStars ? 'text-yellow-400' : 
          hasHalfStar && i === fullStars ? 'text-yellow-400' : 
          'text-gray-300'
        }`}>
          {i < fullStars ? '★' : hasHalfStar && i === fullStars ? '½' : '☆'}
        </span>
      ))}
      <span className="ml-1 text-gray-700">{rating.toFixed(1)}</span>
    </div>
  );
};

export default RatingStars;