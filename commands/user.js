const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with user info!'),
    async execute(interaction) {
        await interaction.reply(
            `Your tag: ${interaction.user.tag}\n` +
            `Your id: ${interaction.user.id}\n` +
            `Your username: ${interaction.user.username}\n` +
            `client: ${JSON.stringify(interaction.member.client)}\n\n` +
            `displayName: ${interaction.member.displayName}\n` +
            `guild: ${interaction.member.guild}\n` +
            `permissions: ${JSON.stringify(interaction.member.permissions)}\n` +
            `user: ${interaction.member.user}\n`+
            `displayAvatarURL(): ${interaction.member.displayAvatarURL()}\n`
        );
        await console.log(JSON.stringify(interaction.member.roles));
        await interaction.channel.send('You just used the user command!');
    },
}