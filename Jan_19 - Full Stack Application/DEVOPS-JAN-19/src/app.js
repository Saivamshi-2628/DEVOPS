const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const { sequelize } = require("./models");

const courseRoutes = require("./routes/course.routes");
const enrollmentRoutes = require("./routes/enrollment.routes");

const app = express();
app.use(express.json());

// Root endpoint - verifies database connection
app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ message: "Training Platform API running" });
  } catch (error) {
    res.status(503).json({ message: "API unavailable - database connection failed" });
  }
});

// API routes
app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);

// API root endpoint - verifies database connection
app.get("/api", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ message: "Training Platform API running" });
  } catch (error) {
    res.status(503).json({ message: "API unavailable - database connection failed" });
  }
});

// 404 handler for all routes
app.use((req, res) => res.status(404).json({ message: "Not found" }));

app.use(errorHandler);

module.exports = app;
