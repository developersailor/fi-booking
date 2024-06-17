import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const getBookings = async (req: Request, res: Response) => {
  const { userId } = req.query;
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: Number(userId)
      }
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
  try {
    const bookings = await prisma.booking.findMany();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};


export const getBookingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const booking = await prisma.booking.findUnique({
      where: {
        id: Number(id)
      }
    });
    if (booking) {
      res.status(200).json(booking);
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch booking' });
  }
};



export const createBooking = async (req: Request, res: Response) => {
  try {
    const { checkInDate, checkOutDate, hotelId, roomId, userId } = req.body;
    const newBooking = await prisma.booking.create({
      data: {
        checkInDate,
        checkOutDate,
        hotelId,
        roomId,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

// Other controller methods


export const updateBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { checkInDate, checkOutDate, hotelId, roomId, userId } = req.body;
    const booking = await prisma.booking.update({
      where: {
        id: Number(id)
      },
      data: {
        checkInDate,
        checkOutDate,
        hotelId,
        roomId,
        userId
      }
    });
   
    if (booking) {
      res.status(200).json(booking);
    }
    else{
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const booking = await prisma.booking.delete({
      where: {
        id: Number(id)
      }
    });
    if (booking) {
      res.status(200).json({ message: 'Booking deleted' });
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
};
