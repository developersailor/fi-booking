import React, { useEffect, useState } from 'react';
import axios from '../axiosInstance';
import HotelCard from '../components/HotelCard';

interface Image {
  url: string;
}

interface Hotel {
  id: number;
  name: string;
  description: string;
  images: Image[];
}

const Home: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('/api/hotels');
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div className="space-y-8">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
};

export default Home;
