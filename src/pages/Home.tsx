import React from 'react';
import HomeDetails from '../components/HomeDetails';
import { HotelData } from '../types/HotelData'; // Ensure correct path

interface HomeProps {
  hotel: HotelData;
}

const Home: React.FC<HomeProps> = ({ hotel }) => {
  return (
    <div>
      <HomeDetails hotel={hotel} />
    </div>
  );
};

export default Home;
