const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();
require('./config/database');
const express = require('express');
const cors = require('cors');

// Middleware
const verifyToken = require('./middleware/verify-token');

// Controllers
const testJWTRouter = require('./controllers/test-jwt');
const usersRouter = require('./controllers/users');
const profilesRouter = require('./controllers/profiles');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Public Routes
app.use('/test-jwt', testJWTRouter);
app.use('/users', usersRouter);

// Protected Routes
app.use(verifyToken);

app.use('/profiles', profilesRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log('The express app is ready!');
});
