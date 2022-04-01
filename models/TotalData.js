const mongoose = require("mongoose");
const {Schema} = mongoose;

const totalDataSchema = new Schema({
    Email: String,
    Questions: Number,
    Answers: Number,
    Views: Number,
    Endorsements: Number,
    Points: Number,

});

mongoose.model("totalData", totalDataSchema,"totalData");
