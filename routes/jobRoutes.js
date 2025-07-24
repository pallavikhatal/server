const express = require("express");
const router = express.Router();
const { createJob, getJobs, updateJob, deleteJob } = require("../controllers/jobController");
const {protect, isAdmin} = require("../middleware/authMiddleware");

router.post("/", protect, isAdmin, createJob);
router.get("/", getJobs);
router.put("/:id", protect, isAdmin, updateJob);
router.delete("/:id", protect, isAdmin, deleteJob);

module.exports = router;
