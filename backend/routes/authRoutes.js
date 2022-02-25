const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { jwtKey } = require('../keys');

require('../models/User');
const User = mongoose.model('User');

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, jwtKey);

    res.send({ token: token });
  } catch (error) {
    return res.status(422).send(error.message);
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(422).send({ error: 'Invalid credentials..' });
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(422).send({ error: 'Invalid credentials..' });
    }

    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, jwtKey);
    res.send({ token: token });
  } catch (error) {
    return res.status(422).send({ error: 'Invalid credentials..' });
  }
});

module.exports = router;
