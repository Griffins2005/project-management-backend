const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  email: String,
  avatar: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;  