import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const createRoom = async (req: Request, res: Response) => {
  try {
    const { name, type, price, hotelId } = req.body;
    const newRoom = await prisma.room.create({
      data: {
        name,
        type,
        price,
        hotelId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create room' });
  }
};

export const getRoomsByHotel = async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;
    const rooms = await prisma.room.findMany(
      {
        where: {
          hotelId: Number(hotelId)
        },
      }
    );
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
};
