import React, { useEffect, useState } from 'react';

import HotelCard from '../components/HotelCard';
import axios from 'axios';

interface Image {
  url: string;
}

interface Hotel {
  id: string;
  name: string;
  description: string;
  images: Image[];
  location: string;
}

interface HotelData extends Hotel {}

const Home: React.FC = () => {
  const [hotels, setHotels] = useState<HotelData[]>([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get<Hotel[]>('http://localhost:3000/hotels');
        setHotels(response.data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    };
    fetchHotels();
  }, []);

  return (
    <div className="space-y-8">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel as HotelData} />
      ))}
    </div>
  );
};

export default Home;
