const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with server info!'),
    async execute(interaction) {
        await interaction.reply(
            `Server: ${interaction.guild.name}\nTotal Members: ${interaction.guild.memberCount}\n${interaction.guild.joinedAt}`
        );
    },
}
