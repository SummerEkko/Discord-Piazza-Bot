const mongoose = require("mongoose");
const {mongodb} = require("../config.json");
require('../temp/StudentPoint');
const pointUtil = require('../utils/pointUtil');
const roleManger = require('../utils/roleManager');

async function update(guild) {
    mongoose.connect(mongodb).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));
    const studentPoint = mongoose.model('studentPoint');
    for await (const sp of studentPoint.find()) {
        const name = sp['Name'];
        const discordId = sp['DiscordId'];
        const point = sp['Point'];
        const roleName = pointUtil.getRoleName(point);
        if (!roleName) {
            continue;
        }
        await roleManger.changeRoleTo(guild, discordId, roleName);
    }
    // mongoose.disconnect().then(r => console.log("mongodb disconnected")).catch(err => console.log(err));
}

exports.update = update;