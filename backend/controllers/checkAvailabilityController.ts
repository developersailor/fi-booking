import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const fetchRoomsForHotel = async (req: Request, res: Response) => {
  const { hotelId } = req.params;
  try {
    const rooms = await prisma.room.findMany({
      where: {
        hotelId: Number(hotelId)
      }
    });
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Failed to fetch rooms. Please try again later.' });
  }
};


