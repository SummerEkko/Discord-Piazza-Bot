const mongoose = require("mongoose");
const {Schema} = mongoose;

const studentPointSchema = new Schema({
    Name: String,
    DiscordId: {type: String, required: true},
    Point: {type: Number, default: 0}
});

mongoose.model("studentPoint", studentPointSchema);
