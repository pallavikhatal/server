const Job = require("../models/Job");

exports.createJob = async (req, res) => {
    try {
        const newJob = await Job.create(req.body);
        res.status(201).json(newJob);
    } catch (err) {
        res.status(500).json({ error: "Failed to create job" });
    }
};


exports.getJobs = async (req, res) => {
    try {
        const { location, type, minSalary, maxSalary, keyword, page = 1, limit = 5 } = req.query;
        const query = {};

        if (location) query.location = location;
        if (type) query.type = type;

        if (minSalary && maxSalary) {
            query["salaryRange.min"] = { $gte: Number(minSalary) };
            query["salaryRange.max"] = { $lte: Number(maxSalary) };
        }

        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ];
        }

        const jobs = await Job.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ postedDate: -1 });

        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
};


exports.updateJob = async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedJob);
    } catch (err) {
        res.status(500).json({ error: "Failed to update job" });
    }
};


exports.deleteJob = async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: "Job deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete job" });
    }
};
