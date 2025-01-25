const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  experience: { type: Number, required: true },
  position: { type: String, required: true },
});

module.exports = mongoose.model("TeamMember", teamMemberSchema);