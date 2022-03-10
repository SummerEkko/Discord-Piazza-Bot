const {Client, Intents} = require('discord.js');
const {token} = require('./config.json');


const client = new Client({intents: [Intents.FLAGS.GUILDS]});
const guild = client.guilds.cache.get('950903036442734664');
const channel = guild.channels.cache.get('950903037319323710');
channel.send('You message');

client.login(token);
