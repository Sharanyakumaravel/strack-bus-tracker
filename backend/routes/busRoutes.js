const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

// GET all buses
router.get("/buses", async (req, res) => {
    const buses = await Bus.find();
    res.json(buses);
});

// Simulate bus movement
router.get("/simulate/:id", async (req,res)=>{

const id = req.params.id;

let lat = 10.7905;
let lng = 78.7047;

setInterval(async ()=>{

lat += 0.001;
lng += 0.001;

await Bus.findByIdAndUpdate(id,{
latitude:lat,
longitude:lng
});

},3000);

res.send("Simulation started");

});

module.exports = router;