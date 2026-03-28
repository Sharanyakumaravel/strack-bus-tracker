const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "your-mongodb-url", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Bus Schema
const BusSchema = new mongoose.Schema({
  busId: String,
  latitude: Number,
  longitude: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Bus = mongoose.model("Bus", BusSchema);

// API to update bus location
app.post("/update-bus-location", async (req, res) => {
  try {
    const { busId, latitude, longitude } = req.body;

    const newLocation = new Bus({
      busId,
      latitude,
      longitude
    });

    await newLocation.save();

    res.json({ message: "Location updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API to get bus locations
app.get("/bus-locations", async (req, res) => {
  try {
    const locations = await Bus.find().sort({ timestamp: -1 }).limit(10);
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});