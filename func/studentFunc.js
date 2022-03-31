const mongoose = require("mongoose");
const {mongodb} = require("../config.json");

require("../models/Student");
require("../models/TotalData");
require("../models/DailyData");

async function save(email, discordID, option, mongoose) {
    const studentTable = mongoose.model('student');
    await studentTable.findOneAndUpdate({DiscordId: discordID}, {
        $set: {
            Email: email,
            Option: option
        }
    }, {upsert: true});
}


async function updateAllPoint(mongoose) {
    const studentTable = mongoose.model('student')
    const totalData = mongoose.model('totalData');
    const totalDataList = await totalData.find({});
    const studentList = await studentTable.find({});
    for (let i = 0; i < studentList.length; i++) {
        for (let j = 0; j < totalDataList.length; j++) {
            if (studentList[i]['Email'] === totalDataList[j]['Email']) {
                const point = totalDataList[j]['Points'];
                await studentTable.findOneAndUpdate({DiscordId: studentList[i]['DiscordId']}, {$set: {Point: point}}, {upsert: true});
            }
        }
    }
}

async function dailyTop(mongoose) {
    return new Promise(async (resolve, reject) => {
        const dailyData = mongoose.model('dailyData');
        const dailyDataList = await dailyData.find({}).sort({Points: -1}).limit(3);
        let msg = "";
        for (let i = 0; i < dailyDataList.length; i++) {
            msg += `${i + 1}. ${dailyDataList[i]['Email']} - ${dailyDataList[i]['Points']}\n`;
        }
        if (msg === "") {
            msg = "No data from yesterday";
        } else {
            msg = `Top 3 Daily Points\n${msg}`;
        }
        resolve(msg);
    })
}

exports.save = save;
exports.updateAllPoint = updateAllPoint;
exports.dailyTop = dailyTop;