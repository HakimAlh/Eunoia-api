// controllers/profiles.js
const express = require('express');

const router = express.Router();
const User = require('../models/user');

router.get('/:userId', async (req, res) => {
  try {
    if (req.user._id !== req.params.userId) {
      // check the ID of the user!
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      res.status(404);
      throw new Error('Profile not found.');
    }
    res.json({ user });
  } catch (error) {
    if (res.statusCode === 404) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;
