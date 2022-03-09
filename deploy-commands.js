const fs = require('fs');
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const {clientId, token} = require('./config.json');

const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

commandFiles.forEach(file => {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
});

const rest = new REST({version: '9'}).setToken(token);

rest.put(Routes.applicationCommands(clientId), {body: commands})
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);