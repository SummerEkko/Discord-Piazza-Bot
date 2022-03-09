module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        const guild = client.guilds.cache.get('950903036442734664');
        const channel = guild.channels.cache.get('950903037319323710');
        channel.send('You message');
    }
}
