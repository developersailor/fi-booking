import { Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import db from '../models'; // Adjust this import based on your Sequelize initialization

const Hotel = db.Hotel; // Assuming db.Hotel is your Sequelize model
export const getAllHotels = async (req: Request, res: Response) => {
  try {
    const { city } = req.query;
    const hotels = await Hotel.findAll({ where:{
      
    } });
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels', error });
  }
};

export const getHotelById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findByPk(id as string);
    if (hotel) {
      res.status(200).json(hotel);
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotel', error });
  }
};
export const createHotel = async (req: Request, res: Response) => {
  try {
    const { name, city, country, price } = req.body;
    const newHotel = await Hotel.create({ name, city, country, price });
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ message: 'Error creating hotel', error });
  }
};


export const updateHotel = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [updated] = await Hotel.update(req.body, { where: { id } });
    if (updated) {
      const updatedHotel = await Hotel.findByPk(id as string);
      res.status(200).json(updatedHotel);
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating hotel', error });
  }
};

export const deleteHotel = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await Hotel.destroy({ where: { id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting hotel', error });
  }
};
