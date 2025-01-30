const Project = require("../models/project");

exports.createProject = async (req, res) => {
  try {
    const { name } = req.body;
    const project = new Project({ name });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Error creating project" });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    const formattedProjects = projects.map((project) => ({
      id: project._id,
      name: project.name,
    }));
    res.status(200).json(formattedProjects);
  } catch (error) {
    res.status(500).json({ error: "Error fetching projects" });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Error fetching project" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting project with ID:", id);
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Error deleting project" });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    console.log("Updating project with ID:", id);
    const project = await Project.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Error updating project" });
  }
};