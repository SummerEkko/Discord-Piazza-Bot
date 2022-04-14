require("../models/Student")
require("../models/DailyData")

async function sendMessage(client, mongoose) {
    const data = await getOptInId(mongoose);
    let listOfDiscordId = Array.from(data.keys());
    let listOfEmail = Array.from(data.values());
    const dailyData = mongoose.model("dailyData");
    const studentPoints = await dailyData.find({});
    for (let i = 0; i < listOfDiscordId.length; i++) {
        for (let j = 0; j < studentPoints.length; j++) {
            if (listOfEmail[i] === studentPoints[j]["Email"]) {
                let point = studentPoints[j]["Points"];
                client.users.fetch(listOfDiscordId[i], true).then((user) => {
                    user.send(
                        "The point you earned today is : " +
                        point +
                        ". Please keep it up!"
                    );
                });
            }
        }
    }
}

async function getOptInId(mongoose) {
    return new Promise(async (resolve, reject) => {
        const studentPoint = mongoose.model("student");
        const optInList = await studentPoint.find({Option: true});
        let optIn = new Map();
        for (let i = 0; i < optInList.length; i++) {
            optIn.set(optInList[i].get("DiscordId"), optInList[i].get("Email"));
        }
        resolve(optIn);
    });
}

exports.sendMessage = sendMessage;
