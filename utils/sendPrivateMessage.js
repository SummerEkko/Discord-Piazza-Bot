const { Client, Intents, Collection } = require("discord.js");
const { token, mongodb } = require("../config.json");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.users.fetch("802398350761525268", false).then((user) => {
  user.send("private message!");
});

client.login(token);
