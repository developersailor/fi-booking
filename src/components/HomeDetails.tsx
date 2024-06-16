import React from 'react';
import { HotelData } from '../types/HotelData'; // Ensure correct path

interface HomeDetailsProps {
  hotel: HotelData;
}

const HomeDetails: React.FC<HomeDetailsProps> = ({ hotel }) => {
  return (
    <div>
      <h2>{hotel.name}</h2>
      <p>{hotel.description}</p>
      <p>Rating: {hotel.rating}</p>
      <p>Reviews: {hotel.reviews}</p>
    </div>
  );
};

export default HomeDetails;
