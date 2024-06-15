import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
}

const CheckAvailability: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`/api/hotels/${hotelId}/rooms`);
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, [hotelId]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Rooms</h1>
      <div className="space-y-4">
        {rooms.map((room) => (
          <div key={room.id} className="p-4 border rounded-lg">
            <h2 className="text-xl font-bold">{room.name}</h2>
            <p>Type: {room.type}</p>
            <p>Price: ${room.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckAvailability;
