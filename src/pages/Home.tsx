// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import HomeDetails from '../components/HomeDetails';
import { HotelData } from '../types/HotelData';
import axios from 'axios';

const Home: React.FC = () => {
  const [hotels, setHotels] = useState<HotelData[]>([]);

  useEffect(() => {
    const fetchHotels = async () => {
      // Fetch data from your backend
      const response = await axios.get<HotelData[]>('http://localhost:3000/hotels');
      const data = await response.data;
      setHotels(data);
    };

    fetchHotels();
  }, []);

  return hotels.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {hotels.map((hotel) => (
        <HomeDetails key={hotel.id} hotel={hotel} />
      ))}
    </div>) :
    (
      <p className="text-center text-2xl mt-4">Loading...</p>
    );
};

export default Home;