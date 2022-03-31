const mongoose = require("mongoose");
const {Schema} = mongoose;

const dailyDataSchema = new Schema({
    Email: String,
    Questions: Number,
    Answers: Number,
    Views: Number,
    Endorsements: Number,
    Points: Number,

});

mongoose.model("dailyData", dailyDataSchema,"dailyData");
