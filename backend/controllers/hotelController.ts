import { Request, Response } from 'express';
import models from '../models';

const { Hotel } = models;
export const getHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.findAll();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
};

export const getHotelById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findByPk(id);
    if (hotel) {
      res.status(200).json(hotel);
    } else {
      res.status(404).json({ error: 'Hotel not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hotel' });
  }
};