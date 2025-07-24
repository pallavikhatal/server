const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  resumeLink: String,
  coverLetter: String,
  appliedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Application", applicationSchema);
