const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();
require('./config/database');
const express = require('express');
const cors = require('cors');

// Middleware
const verifyToken = require('./middleware/verify-token');

// Controllers
const usersRouter = require('./controllers/users');
const profilesRouter = require('./controllers/profiles');
const bookCtrl = require('./controllers/books')

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Public Routes
app.use('/users', usersRouter); 

// Eunoia
app.use('/books', bookCtrl)



app.use('/profiles', profilesRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log('Eunoia API is ready to be used!');
});
