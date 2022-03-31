const { Faces } = require("@discordjs/builders");
const mongoose = require("mongoose");
const { mongodb } = require("../config.json");
require("../models/InstructorData");
const Instructor = require("../models/InstructorData");

function updateMetrics(userID, p1, p2, p3, p4) {
  mongoose
    .connect(mongodb)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

  Instructor.updateOne(
    { MemberID: userID },
    { $set: { P1: p1, P2: p2, P3: p3, P4: p4 } },
    { upsert: true },
    function (err, doc) {
      if (!err) {
        console.log(doc);
      }
    }
  );
}

exports.updateMetrics = updateMetrics;
