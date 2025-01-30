const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project");

router.post("/", projectController.createProject);
router.get("/", projectController.getAllProjects); 
router.get("/:id", projectController.getProject);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;