const Application = require("../models/Application");

exports.applyJob = async (req, res) => {
  if (req.user.role !== "candidate") {
    return res.status(403).json({ message: "Only candidates can apply" });
  }

  const { jobId, coverLetter, resumeLink } = req.body;

  try {
    const application = await Application.create({
      jobId,
      coverLetter,
      resumeLink,
      candidateId: req.user.id
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: "Application failed", error: error.message });
  }
};
