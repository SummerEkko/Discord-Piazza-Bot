const cron = require('cron');
const roleManager = require('../utils/roleManager');
const updateRole = require("../func/updateRole");

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        const guild = client.guilds.cache.get('950903036442734664');
        const channel = guild.channels.cache.get('950999329588531220');

        updateRole.update(guild).then(() => {
            console.log("Roles updated");
        });
        // const roleName = 'Level 1';
        // const userId = '516753760207503410';
        // roleManager.changeRoleTo(guild, userId, roleName);

        channel.send(`Test Test`);
         // @todo: message content and format
        let scheduledMessage = new cron.CronJob(
            '*/10 * * * * *',
            () => {
                channel.send(`Here should be the performance summary\n`);
            },
            null,
            true,
            'America/New_York'
        );
        scheduledMessage.start()
    }
}
