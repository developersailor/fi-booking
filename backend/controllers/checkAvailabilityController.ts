import { Request, Response } from 'express';
import axios from 'axios';

interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
}

export const fetchRoomsForHotel = async (req: Request, res: Response) => {
  const { hotelId } = req.params;
  
  try {
    // Simulate fetching rooms from a database or external service
    // Replace this with your actual API call to fetch rooms
    const response = await axios.get<Room[]>(`http://localhost:3000/api/hotels/${hotelId}/rooms`);

    // Extract rooms data from response
    const rooms: Room[] = response.data;

    // Respond with the rooms data
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Failed to fetch rooms. Please try again later.' });
  }
};


