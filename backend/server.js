const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'your_default_secret_key';

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));

// In-memory storage for bookings (for simplicity)
const bookings = [];
let users = [];

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  users.push({ username, password: hashedPassword });

  res.status(201).send({ message: 'User registered successfully!' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);

  if (!user) {
    return res.status(404).send({ message: 'User not found!' });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).send({ message: 'Invalid password!' });
  }

  const token = jwt.sign({ id: user.username }, SECRET_KEY, {
    expiresIn: 86400, // 24 hours
  });

  res.status(200).send({
    user: {
      username: user.username,
    },
    token,
  });
});

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

// Contact form endpoint
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Send email
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: 'Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to send email' });
    } else {
      return res.status(200).json({ success: 'Message sent successfully!' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
