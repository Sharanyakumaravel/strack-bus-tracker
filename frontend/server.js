const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/strack")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req,res)=>{
    res.send("STrack Server Running");
});

app.listen(5000, ()=>{
    console.log("Server running on port 5000");
});