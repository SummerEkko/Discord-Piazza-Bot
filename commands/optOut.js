const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('opt-out')
        .setDescription('Opt out of the performance notifications'),
    async execute(interaction) {
        if (!interaction.guild) {
            await interaction.reply('This command can only be used in a server');
            return;
        }
        // todo: check if the user is already opted in
        // todo: save user's name, discord id and preference to db
        await interaction.reply(`You have opted out of the performance notifications.`);
    },
}
