const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/strack");

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected Successfully");
});