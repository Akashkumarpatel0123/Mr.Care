const VerificationBadge = ({ verified }) => {
  if (!verified) return null;

  return (
    <div 
      className="absolute -bottom-1 -right-1 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full flex items-center"
      title="Verified Professional"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        className="w-3 h-3 mr-1 fill-current"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      Verified
    </div>
  );
};

export default VerificationBadge;