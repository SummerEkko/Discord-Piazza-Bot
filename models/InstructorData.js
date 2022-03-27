const mongoose = require("mongoose");
const { Schema } = mongoose;

const instructorDataSchema = new Schema({
  InstructorID: { type: String, default: "" },
  InstructorPassword: { type: String, default: "" },
  NetworkID: { type: String, default: "" },
  P1: { type: Number, default: 1 },
  P2: { type: Number, default: 1 },
  P3: { type: Number, default: 1 },
  P4: { type: Number, default: 1 },
});

mongoose.model("instructorData", instructorDataSchema);
