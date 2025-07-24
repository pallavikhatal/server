const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  company: String,
  location: String,
  salaryRange: { min: Number, max: Number },
  type: { type: String, enum: ["Full-time", "Part-time", "Internship"] },
  postedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", jobSchema);
