const express = require("express");
const app = express();  // Declare app once
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const passport = require("./passport.js");

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const taskRoutes = require('./routes/task');
const authRoutes = require('./routes/auth');
const priorityRoutes = require('./routes/priority');
const teamRoutes = require('./routes/team');
const statusRoutes = require('./routes/progress');
const projectRoutes = require('./routes/project');

app.use(
  cors({
    origin: "https://project-management-tool-8kmq.onrender.com", 
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/team', teamRoutes);
app.use("/api/statuses", statusRoutes);
app.use('/api/priorities', priorityRoutes);
app.use('/api/projects', projectRoutes);

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

console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("Google Client Secret:", process.env.GOOGLE_CLIENT_SECRET);
