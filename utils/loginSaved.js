const { SlashCommandBuilder } = require("@discordjs/builders");
const { default: mongoose } = require("mongoose");
const executeBotPy = require("../utils/executeBotPy");
require("../models/InstructorData");
const { mongodb } = require("../config.json");
const { BaseGuildTextChannel } = require("discord.js");
const Instructor = require("../models/InstructorData");

function loginSaved(MemberID, InstructorID, InstructorPassword, NetworkID) {
  mongoose
    .connect(mongodb)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

  const InstructorData = mongoose.model("InstructorData");

  InstructorData.find({ MemberID: MemberID }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      Instructor.updateOne(
        { MemberID: MemberID },
        {
          $set: {
            InstructorID: InstructorID,
            InstructorPassword: InstructorPassword,
            NetworkID: NetworkID,
          },
        },
        { upsert: true },
        function (err, doc) {
          if (!err) {
            console.log(doc);
          }
        }
      );
    }
  });
}

exports.loginSaved = loginSaved;
