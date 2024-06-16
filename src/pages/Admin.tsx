import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHotels, addHotel, updateHotel, deleteHotel } from '../slice/adminSlice';
import { RootState, AppDispatch } from '../store/store';
import { HotelData } from '../types/HotelData';

const AdminPanel: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { hotels, loading, error } = useSelector((state: RootState) => state.admin);
  const [newHotel, setNewHotel] = useState<HotelData>({
    id: 0,
    name: '',
    location: '',
    pricePerNight: 0,
    guests: 0,
    bedrooms: 0,
    bathrooms: 0,
    reviews: 0,
    rating: 0,
    images: [],
    description: '',
    amenities: []
  });

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  const handleAddHotel = () => {
    dispatch(addHotel(newHotel));
    setNewHotel({
      id: 0,
      name: '',
      location: '',
      pricePerNight: 0,
      guests: 0,
      bedrooms: 0,
      bathrooms: 0,
      reviews: 0,
      rating: 0,
      images: [],
      description: '',
      amenities: []
    });
  };

  const handleUpdateHotel = (hotel: HotelData) => {
    dispatch(updateHotel(hotel));
  };

  const handleDeleteHotel = (id: number) => {
    dispatch(deleteHotel(id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Add New Hotel</h2>
        <input
          type="text"
          placeholder="Name"
          value={newHotel.name}
          onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Location"
          value={newHotel.location}
          onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })}
          className="border p-2 mr-2"
        />
        <button onClick={handleAddHotel} className="bg-blue-500 text-white p-2">Add Hotel</button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Hotels</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="border p-4">
              <h3 className="font-bold">{hotel.name}</h3>
              <p>{hotel.location}</p>
              <p>{hotel.description}</p>
              <button onClick={() => handleUpdateHotel(hotel)} className="bg-green-500 text-white p-2 mr-2">Update</button>
              <button onClick={() => handleDeleteHotel(hotel.id)} className="bg-red-500 text-white p-2">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
