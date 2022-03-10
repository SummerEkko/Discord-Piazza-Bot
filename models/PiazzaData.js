const mongoose = require("mongoose");
const {Schema} = mongoose;

const piazzaDataSchema = new Schema({
    QuestionsAsked: {type: Number, default: 0},
    AnswersToQuestions: {type: Number, default: 0},
    MostViews: {type: Number, default: 0},
    EndorsementByOtherUsers: {type: Number, default: 0}
});

mongoose.model("piazzaData", piazzaDataSchema);
