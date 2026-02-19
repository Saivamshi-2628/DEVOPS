// server.js
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json()); // replaces body-parser

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/eventDB")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Event Schema
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    participants: { type: [String], default: [] },
  },
  { timestamps: true },
);

// Event Model
const Event = mongoose.model("Event", eventSchema);

// ---------------- CRUD OPERATIONS ----------------

// CREATE Event
app.post("/events", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ Events (Pagination + Search)
app.get("/events", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";

  try {
    const query = {
      title: { $regex: search, $options: "i" },
    };

    const events = await Event.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Event.countDocuments(query);

    res.status(200).json({
      events,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE Event
app.put("/events/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE Event
app.delete("/events/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 Event Management API is running");
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
