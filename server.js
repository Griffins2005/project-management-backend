require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
//const cors = require('cors');
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log('Connected to MongoDB');
    const port = process.env.PORT || 5001;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });