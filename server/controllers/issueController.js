const AreaIssue = require("../models/AreaIssue");
const User = require("../models/User");
const { sendIssueNotification } = require("../utils/emailService");

// Create new issue
exports.createIssue = async (req, res) => {
  try {
    const { address, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    if (!image) {
      return res.status(400).json({ msg: "Image is required" });
    }

    const newIssue = new AreaIssue({
      user: req.user.id,
      address,
      description,
      image,
    });

    const issue = await newIssue.save();

    // Send notification to all corporations
    const corporations = await User.find({ userType: "corporation" });
    for (const corporation of corporations) {
      await sendIssueNotification(corporation.email, issue);
    }

    res.json(issue);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all issues
exports.getAllIssues = async (req, res) => {
  try {
    const issues = await AreaIssue.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get issues by user
exports.getUserIssues = async (req, res) => {
  try {
    const issues = await AreaIssue.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(issues);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update issue status
exports.updateIssueStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const issue = await AreaIssue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ msg: "Issue not found" });
    }

    issue.status = status;
    issue.updatedAt = Date.now();

    await issue.save();
    res.json(issue);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
