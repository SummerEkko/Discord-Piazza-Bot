const mongoose = require("mongoose");
const {Schema} = mongoose;

const hierarchySchema = new Schema({
    DiscordID: String,
    LevelName: String,
    Point: Number,
});

mongoose.model("hierarchy", hierarchySchema,"hierarchies");
