// src/components/HomeDetails.tsx
import React from 'react';
import { HotelData } from '../types/HotelData';

interface HomeDetailsProps {
  hotel: HotelData;
}

const HomeDetails: React.FC<HomeDetailsProps> = ({ hotel }: {
  hotel: HotelData;
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* <img src={hotel.images[0]} alt={hotel.name} className="w-full h-64 object-cover" /> */}
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
        {/* <div className="flex flex-wrap mt-4">
          {hotel.amenities.map((amenity, index) => (
            <span key={index} className="bg-gray-200 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
              {amenity}
            </span>
          ))}
        </div> */}
        <div className="mt-4 text-sm text-gray-800 font-semibold">
          <span>★ {hotel.rating} · {hotel.reviews} reviews</span>
        </div>
      </div>
    </div>
  );
};

export default HomeDetails;