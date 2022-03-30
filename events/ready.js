const cron = require('cron');
const roleManager = require("../func/roleManager");

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        const guild = client.guilds.cache.get('950903036442734664');
        const channel = guild.channels.cache.get('950999329588531220');

        channel.send(`Test Test`);
        // @todo: message content and format
        let roleUpdateJob = new cron.CronJob(
            '*/10 * * * * *',
            () => {
                roleManager.update(guild).then(() => {
                    console.log("Roles updated");
                });
            },
            null,
            true,
            'America/New_York'
        )

        let scheduledMessage = new cron.CronJob(
            '*/10 * * * * *',
            () => {
                channel.send(`Here should be the performance summary\n`);
            },
            null,
            true,
            'America/New_York'
        );

        roleUpdateJob.start();
        scheduledMessage.start()
    }
}
