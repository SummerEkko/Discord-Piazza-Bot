require("../models/Student")
require("../models/DailyData")

async function sendMessage(client, mongoose) {
    getOptInId(mongoose).then((data) => {
        let listOfDiscordId = Array.from(data.keys());
        let listOfEmail = Array.from(data.values());
        for (let i = 0; i < listOfDiscordId.length; i++) {
            client.users.fetch(listOfDiscordId[i], true).then((a) => {
                getStudentPoint(mongoose, listOfEmail[i]).then((data) => {
                    let point = data.Points;
                    a.send(
                        "The point you earned today is : " +
                        point +
                        ". Please keep it up!"
                    );
                });
            });
        }
    });
}


async function getStudentPoint(mongoose, email) {
    return new Promise(async (resolve, reject) => {
        const dailyData = mongoose.model("dailyData");
        const studentPoint = await dailyData
            .findOne({Email: email})
            .select("Points");
        resolve(studentPoint);
    });
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
