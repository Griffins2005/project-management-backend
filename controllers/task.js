const Task = require("../models/task");

const getTasks = async (req, res) => {
  const { projectId } = req.params;
  try {
    const tasks = await Task.find({ projectId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); 
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, startDate, dueDate, projectId, priority } = req.body;
    const newTask = new Task({ title, description, assignedTo, startDate, dueDate, projectId, priority });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask, getAllTasks };