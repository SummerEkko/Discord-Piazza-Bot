const mongoose = require("mongoose");
const { Schema } = mongoose;

var hierarchySchema = new Schema({
  DiscordID: { type: String, default: "" },
  LevelName: { type: String, default: "" },
  Point: { type: Number, default: 0 },
});

var Hierarchy = mongoose.model("Hierarchy", hierarchySchema);

module.exports = Hierarchy;
