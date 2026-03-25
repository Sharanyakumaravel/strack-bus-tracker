const mongoose = require("mongoose");
const Bus = require("./models/Bus");
const data = require("./busData.json");

mongoose.connect("mongodb://localhost:27017/strack")
.then(async () => {

    console.log("MongoDB Connected");

    // Clear old data
    await Bus.deleteMany();

    // Insert new data
    await Bus.insertMany(data);

    console.log("Bus Data Imported Successfully");

    process.exit();

})
.catch(err => console.log(err));