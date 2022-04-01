const mongoose = require("mongoose");
const { token, mongodb } = require("../config.json");
require("../models/DailyData");

async function getStudentPoint(email) {
  mongoose
    .connect(mongodb)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

  return new Promise(async (resolve, reject) => {
    const dailyData = mongoose.model("dailyData");
    const studentPoint = await dailyData
      .findOne({ Email: email })
      .select("Points");
    // let optin = [];
    console.log(studentPoint);
    resolve(studentPoint);
  });
}

exports.getStudentPoint = getStudentPoint;
