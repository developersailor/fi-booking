"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHotel = exports.updateHotel = exports.createHotel = exports.getHotelById = exports.getAllHotels = exports.getBookings = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getBookings = async (req, res) => {
    const { userId } = req.query;
    try {
        const bookings = await prisma.booking.findMany({
            where: {
                userId: Number(userId)
            }
        });
        res.status(200).json(bookings);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
    try {
        const bookings = await prisma.booking.findMany();
        res.status(200).json(bookings);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
};
exports.getBookings = getBookings;
const getAllHotels = async (req, res) => {
    try {
        const hotels = await prisma.hotel.findMany();
        res.status(200).json(hotels);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching hotels', error });
    }
};
exports.getAllHotels = getAllHotels;
const getHotelById = async (req, res) => {
    // Get the hotel ID from the request parameters
    const { id } = req.params;
    try {
        // Find the hotel by ID
        const hotel = await prisma.hotel.findUnique({
            where: {
                id: Number(id)
            }
        });
        // If the hotel is found, return it
        if (hotel) {
            res.status(200).json(hotel);
        }
        else {
            // If the hotel is not found, return a 404 error
            res.status(404).json({ message: 'Hotel not found' });
        }
    }
    catch (error) {
        // If an error occurs, return a 500 error
        res.status(500).json({ message: 'Error fetching hotel', error });
    }
};
exports.getHotelById = getHotelById;
const createHotel = async (req, res) => {
    try {
        const { name, location, pricePerNight } = req.body;
        const newHotel = await prisma.hotel.create({
            data: {
                name,
                location,
                pricePerNight,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });
        res.status(201).json(newHotel);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create hotel' });
    }
};
exports.createHotel = createHotel;
const updateHotel = async (req, res) => {
    const { id } = req.params;
    const { name, location, pricePerNight } = req.body;
    try {
        const updatedHotel = await prisma.hotel.update({
            where: { id: Number(id) },
            data: {
                name,
                location,
                pricePerNight,
                updatedAt: new Date()
            }
        });
        res.status(200).json(updatedHotel);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating hotel', error });
    }
};
exports.updateHotel = updateHotel;
const deleteHotel = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await prisma.hotel.delete({
            where: {
                id: Number(id)
            }
        });
        if (deleted) {
            res.status(204).send();
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