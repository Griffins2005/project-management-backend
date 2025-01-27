require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const taskRoutes = require('./routes/task');
const priorityRoutes = require('./routes/priority')
const teamRoutes = require('./routes/team')
const statusRoutes = require('./routes/progress')

app.use(cors({
  origin: "http://localhost:3000", 
  methods: ["GET", "POST", "DELETE", "PUT"], 
  credentials: true, 
}));


app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/team', teamRoutes);
app.use("/api/statuses", statusRoutes);
app.use('/api/priorities', priorityRoutes);

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