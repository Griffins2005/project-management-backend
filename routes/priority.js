const express = require("express");
const router = express.Router();
const {getAllPriorities, addPriority, updatePriority, deletePriority} = require("../controllers/priority");


router.get("/", getAllPriorities);
router.post("/", addPriority);
router.put("/:id", updatePriority);
router.delete("/:id", deletePriority);

module.exports = router;