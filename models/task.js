const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  assignedTo: { type: String },
  description: { type: String },
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
});

module.exports = mongoose.model('Task', taskSchema);