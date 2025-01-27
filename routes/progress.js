const express = require("express");
const {getStatuses,addStatus, 
    updateStatus,deleteStatus} = require("../controllers/progress");

const router = express.Router();

router.get("/", getStatuses);
router.post("/", addStatus);
router.put("/:id", updateStatus);
router.delete("/:id", deleteStatus);

module.exports = router;