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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/check-availability/${hotelId}`);
        setRooms(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setError('Error fetching rooms. Please try again later.');
        setLoading(false);
      }
    };

    if (hotelId) {
      fetchRooms();
    }
  }, [hotelId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Rooms</h1>
      <div className="space-y-4">
        {rooms.length === 0 ? (
          <p>No rooms available for this hotel.</p>
        ) : (
          rooms.map((room) => (
            <div key={room.id} className="p-4 border rounded-lg">
              <h2 className="text-xl font-bold">{room.name}</h2>
              <p>Type: {room.type}</p>
              <p>Price: ${room.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CheckAvailability;
