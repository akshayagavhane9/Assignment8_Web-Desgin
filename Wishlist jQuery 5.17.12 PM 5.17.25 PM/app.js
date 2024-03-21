const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use('/user', userRoutes);

// MongoDB connection
const mongoURI = 'your_mongodb_connection_string';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
