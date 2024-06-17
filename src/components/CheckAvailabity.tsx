import React, { useState } from 'react';
import axios from 'axios';
import { HotelData } from '../types/HotelData';

interface CheckAvailabilityProps {
  hotel: HotelData;
}

const CheckAvailability: React.FC<CheckAvailabilityProps> = ({ hotel }) => {
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckAvailability = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/check-availability', {
        hotelId: hotel.id,
        checkInDate,
        checkOutDate,
      });
      setIsAvailable(response.data.isAvailable);
    } catch (err) {
      setError('Error checking availability');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Check Availability</h3>
      <div className="flex items-center mb-4">
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={handleCheckAvailability}
          className="bg-blue-500 text-white p-2"
        >
          Check
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {isAvailable !== null && (
        <p className={`text-lg font-bold ${isAvailable ? 'text-green-500' : 'text-red-500'}`}>
          {isAvailable ? 'Available' : 'Not Available'}
        </p>
      )}
    </div>
  );
};

export default CheckAvailability;
