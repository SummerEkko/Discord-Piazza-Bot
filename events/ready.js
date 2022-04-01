const cron = require("cron");
// const mongoose = require("mongoose");
// const { token, mongodb } = require("../config.json");
// require("../models/Student");
const studentsOptIn = require("../utils/getOptInId");
const studentPoint = require("../utils/getStudentPoint");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    //console.log(`Ready! Logged in as ${client.user.tag}`);

    // mongoose
    //   .connect(mongodb)
    //   .then(() => console.log("MongoDB Connected"))
    //   .catch((err) => console.log(err));
    // const studentPoint = mongoose.model("student");

    // const query = studentPoint.find({ Name: "zhiyuan" });

    // const d = await studentPoint.find({ });
    studentsOptIn.getOptInId().then((data) => {
      let listOfDiscordId = Array.from(data.keys());
      let listOfEmail = Array.from(data.values());

      for (let i = 0; i < listOfDiscordId.length; i++) {
        client.users.fetch(listOfDiscordId[i], true).then((a) => {
          studentPoint.getStudentPoint(listOfEmail[i]).then((data) => {
            let point = data.Points;
            a.send(
              "The point you earned today is : " +
                point +
                ". Please keep it up!"
            );
            console.log(point);
          });
        });
      }
    });

    const guild = client.guilds.cache.get("950903036442734664");
    const channel = guild.channels.cache.get("950999329588531220");
    channel.send(`Test Test`);
    // @todo: message content and format
    let scheduledMessage = new cron.CronJob(
      "*/10 * * * * *",
      () => {
        channel.send(`Here should be the performance summary\n`);
      },
      null,
      true,
      "America/New_York"
    );
    scheduledMessage.start();
  },
};
