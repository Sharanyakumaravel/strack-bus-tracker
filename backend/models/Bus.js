const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
    busName: String,
    latitude: Number,
    longitude: Number
});

module.exports = mongoose.model("Bus", BusSchema);