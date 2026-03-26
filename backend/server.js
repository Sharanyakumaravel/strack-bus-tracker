const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// ============================
// Middleware
// ============================

app.use(cors());
app.use(express.json());

// ============================
// MongoDB Connection
// ============================

const MONGO_URI =
"mongodb+srv://kumaravelsharanya5_db_user:bus123@cluster0.lkvdsrg.mongodb.net/bustracker?retryWrites=true&w=majority";

async function startServer() {
  try {

    // Connect MongoDB
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB Connected");

    // Start Server
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.log("MongoDB Connection Error:", error);
  }
}

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
// Home Route
// ============================

app.get("/", (req, res) => {
  res.send("Bus Tracker Backend Running 🚍");
});

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

// Get bus locations
app.get("/bus-locations", async (req, res) => {
  try {

    const buses = await Bus.find()
      .sort({ timestamp: -1 })
      .limit(10);

    res.json(buses);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================
// Serve Frontend
// ============================

app.use("/frontend", express.static(path.join(__dirname, "../frontend")));

// ============================
// Start Server
// ============================

startServer();