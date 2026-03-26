const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ============================
// MongoDB Connection
// ============================
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log("MongoDB Connection Error:", err);
});

// ============================
// Bus Schema
// ============================
const busSchema = new mongoose.Schema({
  busId: String,
  latitude: Number,
  longitude: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Bus = mongoose.model("Bus", busSchema);

// ============================
// API Routes
// ============================

// Update bus location
app.post("/update-location", async (req, res) => {
  try {
    const { busId, latitude, longitude } = req.body;

    const bus = new Bus({
      busId,
      latitude,
      longitude
    });

    await bus.save();

    res.json({ message: "Location updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get latest bus locations
app.get("/bus-locations", async (req, res) => {
  try {
    const buses = await Bus.find().sort({ timestamp: -1 }).limit(10);
    res.json(buses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================
// Start Server
// ============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});