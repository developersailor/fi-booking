import React, { useState } from 'react';
import { HotelData } from '../types/hotel';
import StarRating from './StarRating';
import CheckAvailability from './CheckAvailabity';
import Modal from './Modal';
import Review from './Review';
interface HomeDetailsProps {
  hotel: HotelData;
}

const HomeDetails: React.FC<HomeDetailsProps> = ({ hotel }) => {
  const [currentRating, setCurrentRating] = useState<number>(hotel.rating);
  const [showReviews, setShowReviews] = useState<boolean>(false);
  const handleRatingChange = (rating: number) => {
    setCurrentRating(rating);
    
  };
  const handleCloseReviews = () => {
    setShowReviews(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
        <p className="text-gray-600">{hotel.location}</p>
        <p className="text-gray-800 font-bold my-2">${hotel.pricePerNight} / night</p>
        <div className="flex items-center justify-between text-sm text-gray-600 my-2">
          <span>{hotel.guests} Guests</span>
          <span>{hotel.bedrooms} Bedrooms</span>
          <span>{hotel.bathrooms} Bathroom</span>
        </div>
        <p className="text-gray-600 mt-2">{hotel.description}</p>
        <div className="mt-4 text-sm text-gray-800 font-semibold flex items-center">
          <StarRating rating={currentRating} onRatingChange={handleRatingChange} />
          <span className="ml-2">{hotel.reviews} reviews</span>
        </div>
        <CheckAvailability hotel={hotel} />
      </div>
      <button className={
        "w-full py-2 bg-gray-800 text-white font-semibold text-sm uppercase rounded-b-lg"
      } onClick={
        () => setShowReviews(true)
      } >
      <Modal onClose={handleCloseReviews} isOpen={showReviews} children={
          <Review hotelId={hotel.id} reviews={[
            { id: 1, author: 'John Doe', content: 'Great place to stay!', rating: 5 },
            { id: 2, author: 'Jane Doe', content: 'Loved it!', rating: 4 },
            { id: 3, author: 'Alice', content: 'Not bad', rating: 3 },
            
          ]} />
        }>
        </Modal>
      </button>

      
    </div>
  );
};

export default HomeDetails;
