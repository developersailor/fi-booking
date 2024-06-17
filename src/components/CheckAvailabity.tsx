import React, { useState } from 'react';
import { HotelData } from '../types/HotelData';
import { checkAvailability } from '../slice/availabilitySlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface CheckAvailabilityProps {
  hotel: HotelData;
}

const CheckAvailability: React.FC<CheckAvailabilityProps> = ({ hotel }) => {
  const actionResult = useSelector((state: RootState ) => state.availability);

  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckAvailability = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!checkInDate || !checkOutDate) {
        setError('Please select check-in and check-out dates');
        return;
      }
      // Dispatch the checkAvailability action
      await checkAvailability({ hotelId: hotel.id.toString(), checkInDate, checkOutDate });
      
      // Handle the result as needed
      console.log('Check availability action result:', actionResult);
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
    </div>
  );
};

export default CheckAvailability;
