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
    const { name, start, end, color } = req.body;
    if (!name || !start || !end || !color) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const startNum = Number(start);
    const endNum = Number(end);

    if (isNaN(startNum) || isNaN(endNum)) {
      return res.status(400).json({ message: "Start and end must be numbers." });
    }
    if (startNum > endNum) {
      return res.status(400).json({ message: "Start value must be less than or equal to end value." });
    }

    const overlappingPriority = await Priority.findOne({
      $or: [
        { start: { $lte: startNum }, end: { $gte: startNum } },
        { start: { $lte: endNum }, end: { $gte: endNum } },
        { start: { $gte: startNum }, end: { $lte: endNum } },
      ],
    });
    if (overlappingPriority) {
      return res.status(400).json({ message: "The range overlaps with an existing priority." });
    }

    const newPriority = new Priority({ name, start: startNum, end: endNum, color });
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
    const { name, start, end, color } = req.body;

    if (start > end) {
      return res.status(400).json({ message: "Start value must be less than or equal to end value." });
    }

    const overlappingPriority = await Priority.findOne({
      _id: { $ne: id },
      $or: [
        { start: { $lte: start }, end: { $gte: start } },
        { start: { $lte: end }, end: { $gte: end } },
        { start: { $gte: start }, end: { $lte: end } },
      ],
    });

    if (overlappingPriority) {
      return res.status(400).json({ message: "The range overlaps with an existing priority." });
    }

    const updatedPriority = await Priority.findByIdAndUpdate(
      id,
      { name, start, end, color },
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