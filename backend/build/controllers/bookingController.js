"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBookingById = exports.getBookings = void 0;
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
const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await prisma.booking.findUnique({
            where: {
                id: Number(id)
            }
        });
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
        const booking = await prisma.booking.delete({
            where: {
                id: Number(id)
            }
        });
        if (booking) {
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