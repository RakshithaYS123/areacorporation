const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// Database connection
const connectDB = require("./config/db");

// Initialize Express app
const app = express();

// Connect to MongoDB with error handling
connectDB()
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1); // Exit process with failure
  });

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" })); // Increase JSON limit for larger image uploads
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

// Create uploads directory with nested structure if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  console.log("Creating uploads directory");
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from uploads directory with proper caching
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    maxAge: "1d", // Cache static files for 1 day
    etag: true, // Enable ETag for caching
  })
);

// Log all API requests in development
if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/issues", require("./routes/issues"));

// Error handling for routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong on the server",
    error: process.env.NODE_ENV === "production" ? null : err.message,
  });
});

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

// Handle unhandled promise rejections globally
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
});

const PORT = process.env.PORT || 5000;

// Start server with improved error handling
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Uploads directory: ${uploadsDir}`);
});
