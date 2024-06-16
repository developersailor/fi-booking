"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBookingById = exports.getBookings = void 0;
const sequelize_1 = require("sequelize");
const booking_1 = require("../models/booking");
// Initialize Sequelize instance
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
});
const getBookings = async (req, res) => {
    const { userId } = req.query;
    try {
        const bookings = await booking_1.Booking.findAll({ where: { userId } });
        res.status(200).json(bookings);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
};
exports.getBookings = getBookings;
const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await booking_1.Booking.findByPk(id);
        if (booking) {
            res.status(200).json(booking);
        }
        else {
            res.status(404).json({ error: 'Booking not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch booking' });
    }
};
exports.getBookingById = getBookingById;
const createBooking = async (req, res) => {
    try {
        const { checkInDate, checkOutDate, hotelId, roomId } = req.body;
        const newBooking = await booking_1.Booking.create({ checkInDate, checkOutDate, hotelId, roomId });
        res.status(201).json(newBooking);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create booking' });
    }
};
exports.createBooking = createBooking;
// Other controller methods
const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { checkInDate, checkOutDate, hotelId, roomId, userId } = req.body;
        const booking = await booking_1.Booking.findByPk(id);
        if (booking) {
            booking.checkInDate = checkInDate;
            booking.checkOutDate = checkOutDate;
            booking.hotelId = hotelId;
            booking.roomId = roomId;
            booking.userId = userId;
            await booking.save();
            res.status(200).json(booking);
        }
        else {
            res.status(404).json({ error: 'Booking not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update booking' });
    }
};
exports.updateBooking = updateBooking;
const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await booking_1.Booking.findByPk(id);
        if (booking) {
            await booking.destroy();
            res.status(200).json({ message: 'Booking deleted' });
        }
        else {
            res.status(404).json({ error: 'Booking not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete booking' });
    }
};
exports.deleteBooking = deleteBooking;
//# sourceMappingURL=bookingController.js.map