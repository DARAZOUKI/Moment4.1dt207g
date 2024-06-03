const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const authController = require('./new/authController');
const { verifyToken } = require('./middleware/authMiddleware');
dotenv.config();

const app = express();
app.use(bodyParser.json());
// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); 
    });

  // Routes
app.post('/api/register', authController.register);
app.post('/api/login', authController.login);
app.get('/api/protected', verifyToken, authController.protected);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


