import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  setHotels } from '../slice/hotelSlice'; // fetchHotels ekleyelim
import HomeDetails from '../components/HomeDetails';
import { RootState } from '../store/store';
import { HotelData } from '../types/HotelData';
import axios from 'axios';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const hotels = useSelector((state: RootState) => state.hotel.hotel); // Doğru yolu kullanarak 'hotel' dizisine erişelim

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:3000/hotels');
        const data = await response.data;
        dispatch(setHotels(data));
      } catch (error) {
        console.error('Failed to fetch hotels:', error);
      }
    }
    fetchHotels();
  }, [dispatch]);

  return hotels && hotels.length > 0 ? ( // hotels.hotel yerine hotels kullanıyoruz
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {hotels.map((hotel: HotelData) => (
        <HomeDetails key={hotel.id} hotel={hotel} />
      ))}
    </div>
  ) : (
    <p className="text-center text-2xl mt-4">Loading...</p>
  );
};

export default Home;
