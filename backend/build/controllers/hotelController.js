"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHotel = exports.getHotelById = exports.getHotels = void 0;
const models_1 = __importDefault(require("../models"));
const { Hotel } = models_1.default;
const getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.findAll();
        res.status(200).json(hotels);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch hotels' });
    }
};
exports.getHotels = getHotels;
const getHotelById = async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await Hotel.findByPk(id);
        if (hotel) {
            res.status(200).json(hotel);
        }
        else {
            res.status(404).json({ error: 'Hotel not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch hotel' });
    }
};
exports.getHotelById = getHotelById;
const createHotel = async (req, res) => {
    try {
        const newHotel = await Hotel.create(req.body);
        res.status(201).json(newHotel);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create hotel' });
    }
};
exports.createHotel = createHotel;
//# sourceMappingURL=hotelController.js.map