const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer  = require('nodemailer');
const { Client } = require('pg');
const { Sequelize, DataTypes } = require('sequelize');

const nodemailerMailjet = require('nodemailer-mailjet-transport');
dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || "remereferf";

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

// Middleware
app.use(bodyParser.json());
app.use(cors(corsOptions));

// Database setup
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

const auth = {
  auth: {
    apiKey: process.env.MAILJET_API_KEY_PUBLIC,
    apiSecret: process.env.MAILJET_API_KEY_PRIVATE
  }
};
const mailjet = nodemailer.createTransport(nodemailerMailjet(auth));

// Mail gönderme rotanızı oluşturun
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  // Gönderilecek mailin bilgilerini girin
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: 'Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Maili gönderin
  mailjet.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Mail gönderme sırasında bir hata oluştu!' });
    }
    res.json({ message: 'Mail gönderildi!' });
  });
});


// Sequelize setup
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


const Booking = sequelize.define('Booking', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  checkInDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  checkOutDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});



app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    await User.create({ username, password: hashedPassword });
    res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).send({ error: 'Database error: ' + error.message });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).send({ message: 'User not found!' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Invalid Password!' });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token , user: { id: user.id, username: user.username } }); 
  } catch (error) {
    res.status(500).send({ error: 'Database error: ' + error.message });
  }
});


app.post('/check-availability', async (req, res) => {
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

  try {
    const bookings = await Booking.findAll();

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
  } catch (error) {
    res.status(500).send({ error: 'Failed to check availability!' });
  }
});

app.post('/make-booking', async (req, res) => {
  const { username, checkInDate, checkOutDate } = req.body;

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

  try {
    await Booking.create({ username, checkInDate, checkOutDate });
    return res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).send({ error: 'Failed to make booking!' });
  }
});

// Contact form endpoint
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

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
