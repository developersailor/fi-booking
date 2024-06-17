import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { setHotels } from '../slice/hotelSlice';
import { RootState } from '../store/store';
import { HotelData } from '../types/hotel';
interface Image {
  url: string;
}

interface Hotel {
  id: string; // Update the type of id to string
  name: string;
  description: string;
  images: Image[];
  location: string; // Added missing property
}

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const dispatch = useDispatch();
  const hoteldata: HotelData[] = useSelector((state: RootState) => state.hotel.hotel);
  useEffect(() => {
    dispatch(setHotels(hoteldata));
  }, [ hoteldata, dispatch]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-2xl font-bold">{hotel.name}</h2>
      <p>{hotel.description}</p>
      <div className="flex space-x-4 mt-4">
        {hotel.images.map((image, index) => (
          <img key={index} src={image.url} alt={hotel.name} className="w-32 h-32 object-cover" />
        ))}
      </div>
      <Link to={`/check-availability/${hotel.id}`}>
        <button className="mt-4 px-6 py-2 bg-black text-white rounded">
          Check Availability
        </button>
      </Link>
    </div>
  );
};

export default HotelCard;