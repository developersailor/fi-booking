"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingController_1 = require("../controllers/bookingController");
const hotelController_1 = require("../controllers/hotelController");
const roomController_1 = require("../controllers/roomController");
// /api routes
const router = (0, express_1.Router)({
    mergeParams: true,
    strict: true
});
router.get('/bookings', bookingController_1.getBookings);
router.get('/bookings/:id', bookingController_1.getBookingById);
router.post('/bookings', bookingController_1.createBooking);
router.put('/bookings/:id', bookingController_1.updateBooking);
router.delete('/bookings/:id', bookingController_1.deleteBooking);
router.get('/hotels', hotelController_1.getHotels);
router.get('/hotels/:id', hotelController_1.getHotelById);
router.get('/hotels/:id/rooms', roomController_1.getRoomsByHotel);
router.post('/hotels/:id/rooms', roomController_1.createRoom);
exports.default = router;
//# sourceMappingURL=index.js.map