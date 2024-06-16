"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHotel = exports.updateHotel = exports.createHotel = exports.getHotelById = exports.getAllHotels = void 0;
const models_1 = __importDefault(require("../models")); // Adjust this import based on your Sequelize initialization
const Hotel = models_1.default.Hotel; // Assuming db.Hotel is your Sequelize model
const getAllHotels = async (req, res) => {
    try {
        const { city } = req.query;
        const hotels = await Hotel.findAll({ where: {} });
        res.status(200).json(hotels);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching hotels', error });
    }
};
exports.getAllHotels = getAllHotels;
const getHotelById = async (req, res) => {
    const { id } = req.params;
    try {
        const hotel = await Hotel.findByPk(id);
        if (hotel) {
            res.status(200).json(hotel);
        }
        else {
            res.status(404).json({ message: 'Hotel not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching hotel', error });
    }
};
exports.getHotelById = getHotelById;
const createHotel = async (req, res) => {
    try {
        const { name, city, country, price } = req.body;
        const newHotel = await Hotel.create({ name, city, country, price });
        res.status(201).json(newHotel);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating hotel', error });
    }
};
exports.createHotel = createHotel;
const updateHotel = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Hotel.update(req.body, { where: { id } });
        if (updated) {
            const updatedHotel = await Hotel.findByPk(id);
            res.status(200).json(updatedHotel);
        }
        else {
            res.status(404).json({ message: 'Hotel not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating hotel', error });
    }
};
exports.updateHotel = updateHotel;
const deleteHotel = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Hotel.destroy({ where: { id } });
        if (deleted) {
            res.status(204).json();
        }
        else {
            res.status(404).json({ message: 'Hotel not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting hotel', error });
    }
};
exports.deleteHotel = deleteHotel;
//# sourceMappingURL=hotelController.js.map