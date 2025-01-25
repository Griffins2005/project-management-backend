const TeamMember = require("../models/team");

exports.addTeamMember = async (req, res) => {
  try {
    const { name, skills, email, experience, position } = req.body;

    const existingMember = await TeamMember.findOne({ email });
    if (existingMember) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    const newMember = new TeamMember({ name, skills, email, experience, position });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find();
    res.status(200).json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteTeamMember = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedMember = await TeamMember.findByIdAndDelete(id);
  
      if (!deletedMember) {
        return res.status(404).json({ message: "Team member not found!" });
      }
  
      res.status(200).json({ message: "Team member deleted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

exports.updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, skills, email, experience, position } = req.body;
    const updatedMember = await TeamMember.findByIdAndUpdate(
      id,
      { name, skills, email, experience, position },
      { new: true } 
    );

    if (!updatedMember) {
      return res.status(404).json({ message: "Team member not found!" });
    }

    res.status(200).json(updatedMember);
  } catch (error) {
    console.error("Error updating team member:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};