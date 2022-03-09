const cron = require('cron');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        const guild = client.guilds.cache.get('950903036442734664');
        const channel = guild.channels.cache.get('950903037319323710');
         // @todo: message content and format
        let scheduledMessage = new cron.CronJob(
            '15 05 1 * * *',
            () => {
                channel.send(`Cron Message\n${new Date()}`);
                console.log(`Cron Message sent\n${new Date()}`);
            },
            null,
            true,
            'America/New_York'
        );
        scheduledMessage.start()
    }
}
