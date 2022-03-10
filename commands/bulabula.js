const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bulabula')
        .setDescription('bulabula!'),
    async execute(interaction) {
        await interaction.reply('bulabula!');
    },
};
