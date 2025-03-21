const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/sign-token', (req, res) => {
  // Mock user object added
  const user = {
    _id: 1,
    username: 'test',
    password: 'test',
  };

  const token = jwt.sign({ user }, process.env.JWT_SECRET);

  res.json({ token });
});

router.post('/verify-token', (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.json({ decoded });
  } catch (error) {
    res.status(401).json({ error: 'Invalid Token' });
  }
});

module.exports = router;
