const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/strack")
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

const busRoutes = require("./routes/busRoutes");

app.use("/api", busRoutes);

app.get("/", (req,res)=>{
    res.send("STrack Server Running");
});

app.listen(5000, ()=>{
    console.log("Server running on port 5000");
});