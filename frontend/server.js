const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// =============================
// MongoDB Connection
// =============================

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// =============================
// Bus Schema
// =============================

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

// =============================
// API - Update Bus Location
// =============================

app.post("/update-bus-location", async (req, res) => {

  const { busId, latitude, longitude } = req.body;

  try {

    const bus = new Bus({
      busId,
      latitude,
      longitude
    });

    await bus.save();

    res.json({
      message: "Bus location saved"
    });

  } catch (error) {

    res.status(500).json({
      error: "Error saving bus location"
    });

  }

});

// =============================
// API - Get Bus Locations
// =============================

app.get("/bus-locations", async (req, res) => {

  try {

    const buses = await Bus.find().sort({ timestamp: -1 });

    res.json(buses);

  } catch (error) {

    res.status(500).json({
      error: "Error fetching bus locations"
    });

  }

});

// =============================
// Serve Frontend Website
// =============================

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// =============================
// Start Server
// =============================

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});