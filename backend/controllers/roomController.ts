import { Request, Response } from 'express';
import models from '../models';

const { Room } = models;

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { name, type, price, hotelId } = req.body;
    const newRoom = await Room.create({ name, type, price, hotelId });
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create room' });
  }
};

export const getRoomsByHotel = async (req: Request, res: Response) => {
  try {
    const { hotelId } = req.params;
    const rooms = await Room.findAll({ where: { hotelId } });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
};
