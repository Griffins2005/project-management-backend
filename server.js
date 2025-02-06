const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const passport = require("./passport.js");

app.use(
  cors({
    origin: "https://project-management-tool-app.onrender.com",
    methods: ["GET", "POST", "DELETE", "PUT"],
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

const taskRoutes = require("./routes/task");
const authRoutes = require("./routes/auth");
const priorityRoutes = require("./routes/priority");
const teamRoutes = require("./routes/team");
const statusRoutes = require("./routes/progress");
const projectRoutes = require("./routes/project");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/statuses", statusRoutes);
app.use("/api/priorities", priorityRoutes);
app.use("/api/projects", projectRoutes);

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
    const port = process.env.PORT || 5001;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });