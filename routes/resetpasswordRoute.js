// routes/resetPasswordRoute.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path if needed
const bcrypt = require('bcrypt');

// POST /api/reset-password
router.post('/', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
    res.json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'Server error while resetting password.' });
  }
});

module.exports = router;
