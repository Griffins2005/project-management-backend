const express = require("express");
const { updateTeamMember, deleteTeamMember, getTeamMembers, addTeamMember } = require("../controllers/team");

const router = express.Router();

router.post("/members", addTeamMember);
router.get("/members", getTeamMembers);
router.delete("/members/:id", deleteTeamMember);
router.put("/members/:id", updateTeamMember);

module.exports = router;