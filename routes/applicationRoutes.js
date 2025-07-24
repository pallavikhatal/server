const express = require("express");
const router = express.Router();
const { applyJob } = require("../controllers/applicationController");
const {protect} = require("../middleware/authMiddleware");

router.post("/apply", protect, applyJob);

module.exports = router;
