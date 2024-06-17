import React from 'react';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const handleClick = (index: number) => {
    onRatingChange(index + 1);
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-6 h-6 cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-400'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
          onClick={() => handleClick(index)}
        >
          <path
            d="M12 .587l3.668 7.57 8.332 1.205-6.042 5.877 1.428 8.318L12 18.897l-7.386 3.882 1.428-8.318L.001 9.362l8.332-1.205L12 .587z"
          />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
