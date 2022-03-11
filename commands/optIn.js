const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('opt-in')
        .setDescription('Opt in to receive performance data for students')
        .addStringOption(option => option
            .setName('name')
            .setRequired(true)
            .setDescription('Please provide with your Piazza Name')),
    async execute(interaction) {
        if (!interaction.guild) {
            await interaction.reply('This command can only be used in a server');
            return;
        }
        // todo: check if the user is already opted in
        // todo: save user's name, discord id and preference to db
        const name = interaction.options.getString('name');
        await interaction.reply(`Your Piazza name: ${name}`);
    },
}
