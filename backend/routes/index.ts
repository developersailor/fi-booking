import { Router } from 'express';
import { getBookings, getBookingById, createBooking, updateBooking, deleteBooking } from '../controllers/bookingController';
import { getRoomsByHotel, createRoom } from '../controllers/roomController';
import { checkAvailability, fetchRoomsForHotel } from '../controllers/checkAvailabilityController';
import {  login, logout, register } from '../controllers/userController';
import { getAllHotels, getHotelById, createHotel, updateHotel, deleteHotel } from '../controllers/hotelController';
import  swaggerUi from 'swagger-ui-express';
const swaggerDocument: JSON = require('./swagger.json');

const router = Router();

router.get('/hotels', getAllHotels);
router.get('/hotels/:id', getHotelById);
router.post('/hotels', createHotel);
router.put('/hotels/:id', updateHotel);
router.delete('/hotels/:id', deleteHotel);

router.get('/bookings', getBookings);

router.get('/bookings/:id', getBookingById);

router.post('/bookings', createBooking);

router.put('/bookings/:id', updateBooking);

router.delete('/bookings/:id', deleteBooking);

router.get('/hotels', getAllHotels);

router.get('/hotels/:id', getHotelById);

router.get('/hotels/:id/rooms', getRoomsByHotel);
router.post('/hotels/:id/rooms', createRoom);

router.get('/bookings', getBookings);


router.get('/bookings/:id', getBookingById);

router.post('/bookings', createBooking);

router.put('/bookings/:id', updateBooking);

router.delete('/bookings/:id', deleteBooking);

router.get('/hotels', getAllHotels);

router.get('/hotels/:id', getHotelById);

router.get('/hotels/:id/rooms', getRoomsByHotel);

router.post('/hotels/:id/rooms', createRoom);

router.get('/check-availability/:hotelId', fetchRoomsForHotel);
 
router.post('/check-availability', checkAvailability);


router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
export default router;