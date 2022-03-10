const cron = require('cron');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        const guild = client.guilds.cache.get('950903036442734664');
        const channel = guild.channels.cache.get('950999329588531220');
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
