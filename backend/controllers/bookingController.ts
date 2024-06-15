import { Request, Response } from 'express';
import models from '../models';

const { Booking } = models;

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
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
    const { checkInDate, checkOutDate, hotelId, roomId } = req.body;
    const newBooking = await Booking.create({ checkInDate, checkOutDate, hotelId, roomId });
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
    const booking = await Booking.findByPk(id);
    if (booking) {
      booking.checkInDate = checkInDate;
      booking.checkOutDate = checkOutDate;
      booking.hotelId = hotelId;
      booking.roomId = roomId;
      booking.userId = userId;
      await booking.save();
      res.status(200).json(booking);
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
    if (booking) {
      await booking.destroy();
      res.status(200).json({ message: 'Booking deleted' });
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
};
