const express = require("express");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");

const courseRoutes = require("./routes/course.routes");
const enrollmentRoutes = require("./routes/enrollment.routes");

const app = express();
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "../public")));

// API routes
app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);

// API root endpoint
app.get("/api", (req, res) => res.json({ message: "Training Platform API running" }));

// 404 handler for undefined API routes (must be before catch-all)
app.use((req, res, next) => {
  if (req.path.startsWith("/api") || req.path.startsWith("/courses") || req.path.startsWith("/enrollments")) {
    return res.status(404).json({ message: "Not found" });
  }
  next();
});

// Serve index.html for all other routes (SPA fallback)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use(errorHandler);

module.exports = app;