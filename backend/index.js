const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = 3000;
const authRoutes = require('./routes/authRoutes');
const { mongoURI } = require('./keys');

require('./models/User');
app.use(bodyParser.json()); //to parse JSON request from
app.use(authRoutes);
const requireToken = require('./middleware/requireToken');

//MongoDB connection
mongoose.connect(mongoURI);
mongoose.connection.on('connected', () => {
  console.log('Connection Successful to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.log('Connection Unsuccessful to MongoDB', err);
});

app.get('/', requireToken, (req, res) => {
  res.send({ email: req.user.email });
});

//Listening to server
app.listen(PORT, () => {
  console.log(`Listening to PORT- ${PORT}`);
});
