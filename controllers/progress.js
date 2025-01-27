const Status = require("../models/progress");

const getStatuses = async (req, res) => {
  try {
    const statuses = await Status.find();
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addStatus = async (req, res) => {
  const { name } = req.body;

  try {
    const newStatus = new Status({ name });
    await newStatus.save();
    res.status(201).json(newStatus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedStatus = await Status.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.json(updatedStatus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteStatus = async (req, res) => {
  const { id } = req.params;
  try {
    await Status.findByIdAndDelete(id);
    res.json({ message: "Status deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {getStatuses,addStatus,updateStatus,deleteStatus};