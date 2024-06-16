import { Router } from 'express';
import { getBookings, getBookingById, createBooking, updateBooking, deleteBooking } from '../controllers/bookingController';
import { getHotels, getHotelById } from '../controllers/hotelController';
import { getRoomsByHotel, createRoom } from '../controllers/roomController';
import { fetchRoomsForHotel } from '../controllers/checkAvailabilityController';
import { login, logout, register } from '../controllers/userController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management API
 */

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Returns the list of all the bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: The list of the bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 */
router.get('/bookings', getBookings);

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get the booking by id
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking id
 *     responses:
 *       200:
 *         description: The booking description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: The booking was not found
 */
router.get('/bookings/:id', getBookingById);

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: The booking was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Some server error
 */
router.post('/bookings', createBooking);

/**
 * @swagger
 * /bookings/{id}:
 *   put:
 *     summary: Update the booking by the id
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: The booking was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: The booking was not found
 *       500:
 *         description: Some error happened
 */
router.put('/bookings/:id', updateBooking);

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Remove the booking by id
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking id
 *     responses:
 *       200:
 *         description: The booking was deleted
 *       404:
 *         description: The booking was not found
 */
router.delete('/bookings/:id', deleteBooking);

/**
 * @swagger
 * tags:
 *   name: Hotels
 *   description: Hotel management API
 */

/**
 * @swagger
 * /hotels:
 *   get:
 *     summary: Returns the list of all the hotels
 *     tags: [Hotels]
 *     responses:
 *       200:
 *         description: The list of the hotels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hotel'
 */
router.get('/hotels', getHotels);

/**
 * @swagger
 * /hotels/{id}:
 *   get:
 *     summary: Get the hotel by id
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hotel id
 *     responses:
 *       200:
 *         description: The hotel description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       404:
 *         description: The hotel was not found
 */
router.get('/hotels/:id', getHotelById);

/**
 * @swagger
 * /hotels/{id}/rooms:
 *   get:
 *     summary: Get the rooms of a specific hotel
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hotel id
 *     responses:
 *       200:
 *         description: The list of the rooms
 *         contents:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       404:
 *         description: The hotel was not found
 */
router.get('/hotels/:id/rooms', getRoomsByHotel);

/**
 * @swagger
 * /hotels/{id}/rooms:
 *   post:
 *     summary: Create a new room for a specific hotel
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hotel id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       200:
 *         description: The room was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       500:
 *         description: Some server error
 */
router.post('/hotels/:id/rooms', createRoom);


/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management API
 */

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Returns the list of all the bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: The list of the bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 */
router.get('/bookings', getBookings);

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get the booking by id
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking id
 *     responses:
 *       200:
 *         description: The booking description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: The booking was not found
 */
router.get('/bookings/:id', getBookingById);

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: The booking was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Some server error
 */
router.post('/bookings', createBooking);

/**
 * @swagger
 * /bookings/{id}:
 *   put:
 *     summary: Update the booking by the id
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       200:
 *         description: The booking was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: The booking was not found
 *       500:
 *         description: Some error happened
 */
router.put('/bookings/:id', updateBooking);

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Remove the booking by id
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking id
 *     responses:
 *       200:
 *         description: The booking was deleted
 *       404:
 *         description: The booking was not found
 */
router.delete('/bookings/:id', deleteBooking);

/**
 * @swagger
 * tags:
 *   name: Hotels
 *   description: Hotel management API
 */

/**
 * @swagger
 * /hotels:
 *   get:
 *     summary: Returns the list of all the hotels
 *     tags: [Hotels]
 *     responses:
 *       200:
 *         description: The list of the hotels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hotel'
 */
router.get('/hotels', getHotels);

/**
 * @swagger
 * /hotels/{id}:
 *   get:
 *     summary: Get the hotel by id
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hotel id
 *     responses:
 *       200:
 *         description: The hotel description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       404:
 *         description: The hotel was not found
 */
router.get('/hotels/:id', getHotelById);

/**
 * @swagger
 * /hotels/{id}/rooms:
 *   get:
 *     summary: Get the rooms of a specific hotel
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hotel id
 *     responses:
 *       200:
 *         description: The list of the rooms
 *         contents:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       404:
 *         description: The hotel was not found
 */
router.get('/hotels/:id/rooms', getRoomsByHotel);

/**
 * @swagger
 * /hotels/{id}/rooms:
 *   post:
 *     summary: Create a new room for a specific hotel
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The hotel id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       200:
 *         description: The room was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       500:
 *         description: Some server error
 */
router.post('/hotels/:id/rooms', createRoom);

/**
 * @swagger
 * /check-availability/{hotelId}:
 *   get:
 *     summary: Check availability of rooms for a specific hotel
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         schema:
 *           type: string
 *         required: true
 *         description: The hotel id
 *     responses:
 *       200:
 *         description: The availability of rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoomAvailability'
 *       404:
 *         description: The hotel was not found
 */
router.get('/check-availability/:hotelId', fetchRoomsForHotel);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management API
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post('/register', register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Authentication token
 *       500:
 *         description: Some server error
 */
router.post('/login', login);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The user was successfully logged out
 *       500:
 *         description: Some server error
 */
router.post('/logout', logout);

export default router;