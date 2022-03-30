const fs = require('fs');
const {Client, Intents, Collection} = require('discord.js');
const {token, mongodb} = require('./config.json');

const mongoose = require("mongoose");
mongoose.connect(mongodb).then(() => console.log('MongoDB Connected in index.js')).catch(err => console.log(err));

const client = new Client({intents: [Intents.FLAGS.GUILDS]});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

commandFiles.forEach(file => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
});

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

eventFiles.forEach(file => {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
});

client.login(token);
