import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '../store/store';
import { HotelData } from '../types/hotel';
import Modal from '../components/Modal';
import { fetchHotels } from '../slice/hotelSlice';
import { addHotel, deleteHotel, updateHotel } from '../slice/adminSlice';

const AdminPanel: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const {  
    hotels
    } = useSelector((state: RootState) => state.admin);
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

  const [editHotel, setEditHotel] = useState<HotelData | null>(null);

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
    setEditHotel(null);
  };

  const handleDeleteHotel = (id: number) => {
    if (confirm("Are you sure you want to delete this hotel?")) {
      dispatch(deleteHotel(id));
    }
  };

  const openEditModal = (hotel: HotelData) => {
    setEditHotel(hotel);
  };

  const closeEditModal = () => {
    setEditHotel(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        {
        hotels.map((hotel) => (
            <div key={hotel.id} className="border p-4">
                <h3 className="font-bold">{hotel.name}</h3>
                <p>{hotel.location}</p>
                <p>{hotel.description}</p>
                <button onClick={() => openEditModal(hotel)} className="bg-green-500 text-white p-2 mr-2">Update</button>
                <button onClick={() => handleDeleteHotel(hotel.id)} className="bg-red-500 text-white p-2">Delete</button>
            </div>
            ))
        }

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Add New Hotel</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <input
            type="text"
            placeholder="Name"
            value={newHotel.name}
            onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Location"
            value={newHotel.location}
            onChange={(e) => setNewHotel({ ...newHotel, location: e.target.value })}
            className="border p-2"
          />
          <input
            type="number"
            placeholder="Price Per Night"
            value={newHotel.pricePerNight}
            onChange={(e) => setNewHotel({ ...newHotel, pricePerNight: Number(e.target.value) })}
            className="border p-2"
          />
          <input
            type="number"
            placeholder="Guests"
            value={newHotel.guests}
            onChange={(e) => setNewHotel({ ...newHotel, guests: Number(e.target.value) })}
            className="border p-2"
          />
          <input
            type="number"
            placeholder="Bedrooms"
            value={newHotel.bedrooms}
            onChange={(e) => setNewHotel({ ...newHotel, bedrooms: Number(e.target.value) })}
            className="border p-2"
          />
          <input
            type="number"
            placeholder="Bathrooms"
            value={newHotel.bathrooms}
            onChange={(e) => setNewHotel({ ...newHotel, bathrooms: Number(e.target.value) })}
            className="border p-2"
          />
          <input
            type="number"
            placeholder="Reviews"
            value={newHotel.reviews}
            onChange={(e) => setNewHotel({ ...newHotel, reviews: Number(e.target.value) })}
            className="border p-2"
          />
          <input
            type="number"
            placeholder="Rating"
            value={newHotel.rating}
            onChange={(e) => setNewHotel({ ...newHotel, rating: Number(e.target.value) })}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={newHotel.description}
            onChange={(e) => setNewHotel({ ...newHotel, description: e.target.value })}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Amenities (comma separated)"
            value={newHotel.amenities.join(', ')}
            onChange={(e) => setNewHotel({ ...newHotel, amenities: e.target.value.split(', ') })}
            className="border p-2"
          />
        </div>
        <button onClick={handleAddHotel} className="bg-blue-500 text-white p-2 mt-2">Add Hotel</button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Hotels</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="border p-4">
              <h3 className="font-bold">{hotel.name}</h3>
              <p>{hotel.location}</p>
              <p>{hotel.description}</p>
              <button onClick={() => openEditModal(hotel)} className="bg-green-500 text-white p-2 mr-2">Update</button>
              <button onClick={() => handleDeleteHotel(hotel.id)} className="bg-red-500 text-white p-2">Delete</button>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={!!editHotel} onClose={closeEditModal}>
        {editHotel && (
          <div>
            <h2 className="text-xl font-bold mb-2">Edit Hotel</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <input
                type="text"
                placeholder="Name"
                value={editHotel.name}
                onChange={(e) => setEditHotel({ ...editHotel, name: e.target.value })}
                className="border p-2"
              />
              <input
                type="text"
                placeholder="Location"
                value={editHotel.location}
                onChange={(e) => setEditHotel({ ...editHotel, location: e.target.value })}
                className="border p-2"
              />
              <input
                type="number"
                placeholder="Price Per Night"
                value={editHotel.pricePerNight}
                onChange={(e) => setEditHotel({ ...editHotel, pricePerNight: Number(e.target.value) })}
                className="border p-2"
              />
              <input
                type="number"
                placeholder="Guests"
                value={editHotel.guests}
                onChange={(e) => setEditHotel({ ...editHotel, guests: Number(e.target.value) })}
                className="border p-2"
              />
              <input
                type="number"
                placeholder="Bedrooms"
                value={editHotel.bedrooms}
                onChange={(e) => setEditHotel({ ...editHotel, bedrooms: Number(e.target.value) })}
                className="border p-2"
              />
              <input
                type="number"
                placeholder="Bathrooms"
                value={editHotel.bathrooms}
                onChange={(e) => setEditHotel({ ...editHotel, bathrooms: Number(e.target.value) })}
                className="border p-2"
              />
              <input
                type="number"
                placeholder="Reviews"
                value={editHotel.reviews}
                onChange={(e) => setEditHotel({ ...editHotel, reviews: Number(e.target.value) })}
                className="border p-2"
              />
              <input
                type="number"
                placeholder="Rating"
                value={editHotel.rating}
                onChange={(e) => setEditHotel({ ...editHotel, rating: Number(e.target.value) })}
                className="border p-2"
              />
              <input
                type="text"
                placeholder="Description"
                value={editHotel.description}
                onChange={(e) => setEditHotel({ ...editHotel, description: e.target.value })}
                className="border p-2"
              />
              <input
                type="text"
                placeholder="Amenities (comma separated)"
                value={editHotel.amenities.join(', ')}
                onChange={(e) => setEditHotel({ ...editHotel, amenities: e.target.value.split(', ') })}
                className="border p-2"
              />
            </div>
            <button onClick={() => handleUpdateHotel(editHotel)} className="bg-blue-500 text-white p-2 mt-2">Save Changes</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminPanel;
