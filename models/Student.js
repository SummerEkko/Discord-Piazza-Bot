const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  Email: String,
  DiscordId: String,
  Option: Boolean,
  Name: String,
  Point: Number,
});

mongoose.model("student", studentSchema, "students");
