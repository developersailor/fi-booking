"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingController_1 = require("../controllers/bookingController");
const roomController_1 = require("../controllers/roomController");
const checkAvailabilityController_1 = require("../controllers/checkAvailabilityController");
const userController_1 = require("../controllers/userController");
const hotelController_1 = require("../controllers/hotelController");
const router = (0, express_1.Router)();
router.get('/hotels', hotelController_1.getAllHotels);
router.get('/hotels/:id', hotelController_1.getHotelById);
router.post('/hotels', hotelController_1.createHotel);
router.put('/hotels/:id', hotelController_1.updateHotel);
router.delete('/hotels/:id', hotelController_1.deleteHotel);
router.get('/bookings', bookingController_1.getBookings);
router.get('/bookings/:id', bookingController_1.getBookingById);
router.post('/bookings', bookingController_1.createBooking);
router.put('/bookings/:id', bookingController_1.updateBooking);
router.delete('/bookings/:id', bookingController_1.deleteBooking);
router.get('/hotels', hotelController_1.getAllHotels);
router.get('/hotels/:id', hotelController_1.getHotelById);
router.get('/hotels/:id/rooms', roomController_1.getRoomsByHotel);
router.post('/hotels/:id/rooms', roomController_1.createRoom);
router.get('/bookings', bookingController_1.getBookings);
router.get('/bookings/:id', bookingController_1.getBookingById);
router.post('/bookings', bookingController_1.createBooking);
router.put('/bookings/:id', bookingController_1.updateBooking);
router.delete('/bookings/:id', bookingController_1.deleteBooking);
router.get('/hotels', hotelController_1.getAllHotels);
router.get('/hotels/:id', hotelController_1.getHotelById);
router.get('/hotels/:id/rooms', roomController_1.getRoomsByHotel);
router.post('/hotels/:id/rooms', roomController_1.createRoom);
router.get('/check-availability/:hotelId', checkAvailabilityController_1.fetchRoomsForHotel);
router.post('/register', userController_1.register);
router.post('/login', userController_1.login);
router.post('/logout', userController_1.logout);
exports.default = router;
//# sourceMappingURL=index.js.map