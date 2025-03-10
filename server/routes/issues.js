const express = require("express");
const router = express.Router();
const issueController = require("../controllers/issueController");
const auth = require("../middleware/auth");
const checkUserType = require("../middleware/checkUserType");
const multer = require("multer");
const path = require("path");

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Check file type
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only!");
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10000000 }, // 10MB max file size
  fileFilter,
});

// @route   POST api/issues
// @desc    Create a new issue
// @access  Private (user only)
router.post(
  "/",
  [auth, checkUserType("user"), upload.single("image")],
  issueController.createIssue
);

// @route   GET api/issues
// @desc    Get all issues
// @access  Private (corporation only)
router.get(
  "/",
  [auth, checkUserType("corporation")],
  issueController.getAllIssues
);

// @route   GET api/issues/user
// @desc    Get issues by user
// @access  Private (user only)
router.get(
  "/user",
  [auth, checkUserType("user")],
  issueController.getUserIssues
);

// @route   PUT api/issues/:id
// @desc    Update issue status
// @access  Private (corporation only)
router.put(
  "/:id",
  [auth, checkUserType("corporation")],
  issueController.updateIssueStatus
);

module.exports = router;
