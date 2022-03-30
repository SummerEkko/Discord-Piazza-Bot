const {SlashCommandBuilder} = require('@discordjs/builders');
const studentFunc = require("../func/studentFunc");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('opt-out')
        .setDescription('Opt out of the performance notifications'),
    async execute(interaction) {
        if (!interaction.guild) {
            await interaction.reply('This command can only be used in a server');
            return;
        }
        const id = interaction.member.id;
        studentFunc.save("", id, false);
        await interaction.reply(`You have opted out of the performance notifications.`);
    },
}
