const ExperienceBadge = ({ years }) => {
  return (
    <div className="flex items-center text-sm bg-blue-50 text-blue-800 px-2 py-1 rounded">
      <span className="mr-1">🏥</span>
      <span>{years}+ years experience</span>
    </div>
  );
};

export default ExperienceBadge;