const mongoose = require("mongoose");
const { token, mongodb } = require("../config.json");
require("../models/Student");

async function getOptInId() {
  mongoose
    .connect(mongodb)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

  return new Promise(async (resolve, reject) => {
    const studentPoint = mongoose.model("student");
    const optinlist = await studentPoint.find({ Option: true });
    let optin = new Map();
    for (let i = 0; i < optinlist.length; i++) {
      optin.set(optinlist[i].get("DiscordId"), optinlist[i].get("Email"));
    }
    console.log(optin);
    resolve(optin);
  });
}

exports.getOptInId = getOptInId;
