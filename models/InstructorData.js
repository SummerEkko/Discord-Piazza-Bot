const mongoose = require("mongoose");
const { Schema } = mongoose;

var instructorDataSchema = new Schema({
  MemberID: { type: String, default: "" },
  InstructorID: { type: String, default: "" },
  InstructorPassword: { type: String, default: "" },
  NetworkID: { type: String, default: "" },
  P1: { type: Number, default: 1 },
  P2: { type: Number, default: 1 },
  P3: { type: Number, default: 1 },
  P4: { type: Number, default: 1 },
});

var Instructor = mongoose.model("InstructorData", instructorDataSchema);
// mongoose.model("InstructorData", instructorDataSchema);

module.exports = Instructor;
//exports.instructorDataSchema = Instructor;
