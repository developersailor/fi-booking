import { Router } from 'express';
import { getBookings, getBookingById, createBooking, updateBooking, deleteBooking } from '../controllers/bookingController';
import { getHotels, getHotelById } from '../controllers/hotelController';
import { getRoomsByHotel, createRoom } from '../controllers/roomController';
import { fetchRoomsForHotel } from '../controllers/checkAvailabilityController';
import { login, logout } from '../controllers/userController';
import { register } from '../controllers/userController';
const router = Router();

router.get('/bookings', getBookings);
router.get('/bookings/:id', getBookingById);
router.post('/bookings', createBooking);
router.put('/bookings/:id', updateBooking);
router.delete('/bookings/:id', deleteBooking);


router.get('/hotels', getHotels);
router.get('/hotels/:id', getHotelById);
router.get('/hotels/:id/rooms', getRoomsByHotel);
router.post('/hotels/:id/rooms', createRoom);

router.get('/check-availability/:id');

router.get('/check-availability/:hotelId', fetchRoomsForHotel);


router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;

