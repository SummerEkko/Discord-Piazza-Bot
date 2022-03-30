const mongoose = require("mongoose");
const {mongodb} = require("../config.json");

require("../models/Student");

function save(email, discordID, option) {
    mongoose.connect(mongodb).then(() => console.log('MongoDB Connected in studentFunc.js')).catch(err => console.log(err)).then(
        async () => {
            const studentTable = mongoose.model('student');
            await studentTable.findOneAndUpdate(
                {DiscordId: discordID},
                {$set: {Email: email, Option: option}},
                {upsert: true});
        }
    ).then(() => mongoose.disconnect()).then(() => console.log('MongoDB Disconnected in studentFunc.js')).catch(err => console.log(err));
}

exports.save = save;
