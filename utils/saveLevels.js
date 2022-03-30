const { Faces } = require("@discordjs/builders");
const mongoose = require("mongoose");
const { mongodb } = require("../config.json");
require("../models/hierarchyData");
const Hierarchy = require("../models/hierarchyData");

function saveLevels(
  guildId,
  level1Name,
  level2Name,
  level3Name,
  incrementalVal
) {
  mongoose
    .connect(mongodb)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

  const levelArray = [level1Name, level2Name, level3Name];
  for (let i = 0; i < 3; i++) {
    let levelPoint = incrementalVal * (i + 1);
    const Hierarchy = mongoose.model("Hierarchy");
    const level = new Hierarchy({
      DiscordID: guildId,
      LevelName: levelArray[i],
      Point: levelPoint,
    });
    level
      .save()
      .then(() => console.log("Saved"))
      .catch((err) => console.log(err));
  }
}

exports.saveLevels = saveLevels;
