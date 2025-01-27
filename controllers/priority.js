const Priority = require("../models/priority");

exports.getAllPriorities = async (req, res) => {
  try {
    const priorities = await Priority.find();
    res.status(200).json(priorities);
  } catch (error) {
    res.status(500).json({ message: "Error fetching priorities", error });
  }
};

exports.addPriority = async (req, res) => {
  try {
    const { name, color } = req.body;
    if (!name || !color) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newPriority = new Priority({ name, color });
    await newPriority.save();

    res.status(201).json(newPriority);
  } catch (error) {
    console.error("Error in addPriority:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.updatePriority = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;

    const updatedPriority = await Priority.findByIdAndUpdate(
      id,
      { name, color },
      { new: true }
    );

    res.status(200).json(updatedPriority);
  } catch (error) {
    console.error("Error in updatePriority:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.deletePriority = async (req, res) => {
  try {
    const { id } = req.params;
    await Priority.findByIdAndDelete(id);
    res.status(200).json({ message: "Priority deleted successfully" });
  } catch (error) {
    console.error("Error in deletePriority:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};