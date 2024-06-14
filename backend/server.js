const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const process = require('process');
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],  // Add other methods you need
    allowedHeaders: ['Content-Type'],  // Add headers you need
};
// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));

// In-memory storage for bookings (for simplicity)
const bookings = [];

// Check availability endpoint
app.post('/check-availability', (req, res) => {
  const { checkInDate, checkOutDate } = req.body;

  if (!checkInDate || !checkOutDate) {
    return res.status(400).json({ error: 'Check-in and check-out dates are required' });
  }

  // Convert dates to Date objects
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  // Check if the requested dates are less than 5 days
  const diffTime = Math.abs(checkOut - checkIn);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  if (diffDays < 5) {
    return res.status(400).json({ error: 'Bookings must be at least 5 days' });
  }

  // Check if the requested dates are available
  const isAvailable = bookings.every(booking => {
    const bookedCheckIn = new Date(booking.checkInDate);
    const bookedCheckOut = new Date(booking.checkOutDate);

    // Check for overlapping dates
    return checkOut <= bookedCheckIn || checkIn >= bookedCheckOut;
  });

  if (isAvailable) {
    return res.status(200).json({ available: true });
  } else {
    return res.status(200).json({ available: false });
  }
});

// Make a booking (for testing purposes)
app.post('/make-booking', (req, res) => {
  const { checkInDate, checkOutDate } = req.body;

  // Simple validation
  if (!checkInDate || !checkOutDate) {
    return res.status(400).json({ error: 'Check-in and check-out dates are required' });
  }

  // Check if the requested dates are less than 5 days
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const diffTime = Math.abs(checkOut - checkIn);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  if (diffDays < 5) {
    return res.status(400).json({ error: 'Bookings must be at least 5 days' });
  }

  bookings.push({ checkInDate, checkOutDate });
  return res.status(200).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
