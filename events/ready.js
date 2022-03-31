const cron = require('cron');
const roleManager = require("../func/roleManager");
const studentFunc = require("../func/studentFunc");

module.exports = {
    name: 'ready',
    once: true,
    execute(client, mongoose) {
        console.log(`Ready! Logged in as ${client.user.tag}!!!!!!!!!!`);

        const guild = client.guilds.cache.get('950903036442734664');
        const channel = guild.channels.cache.get('950999329588531220');


        let studentPointUpdateJob = new cron.CronJob(
            '*/10 * * * * *',
            () => {
                studentFunc.updateAllPoint(mongoose).then(() => {
                    console.log("Students points updated");
                }).catch(err => {
                    console.log(err);
                })
            },
            null,
            true,
            'America/New_York'
        )


        let roleUpdateJob = new cron.CronJob(
            '*/10 * * * * *',
            () => {
                roleManager.update(guild, mongoose).then(() => {
                    console.log("Roles updated");
                })
            },
            null,
            true,
            'America/New_York'
        )

        let scheduledMessage = new cron.CronJob(
            '*/10 * * * * *',
            async () => {
                studentFunc.dailyTop(mongoose).then(res => {
                    channel.send(res);
                    console.log("Daily top sent");
                })
            },
            null,
            true,
            'America/New_York'
        );

        studentPointUpdateJob.start();
        roleUpdateJob.start();
        scheduledMessage.start()
    }
}
