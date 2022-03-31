const mongoose = require("mongoose");
const {Schema} = mongoose;

const hierarchySchema = new Schema({
    DiscordID: {type: String, default: ""},
    LevelName: {type: String, default: ""},
    Point: {type: Number, default: 0}
});

mongoose.model("hierarchy", hierarchySchema, "hierarchies");
