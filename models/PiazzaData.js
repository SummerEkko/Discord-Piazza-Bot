const mongoose = require("mongoose");
const { Schema } = mongoose;

const piazzaDataSchema = new Schema({
  QuestionsAsked: { type: Number, default: 0 },
  AnswersToQuestions: { type: Number, default: 0 },
  MostViews: { type: Number, default: 0 },
  EndorsementByOtherUsers: { type: Number, default: 0 },
});

const instructorDataSchema = new Schema({
  InstructorID: { type: String, default: "" },
  InstructorPassword: { type: String, default: "" },
  NetworkID: { type: String, default: "" },
  P1: { type: Number, default: 1 },
  P2: { type: Number, default: 1 },
  P3: { type: Number, default: 1 },
  P4: { type: Number, default: 1 },
});

mongoose.model("piazzaData", piazzaDataSchema);
mongoose.model("instructorData", instructorDataSchema);
