const {SlashCommandBuilder} = require('@discordjs/builders');
const studentFunc = require('../func/studentFunc');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('opt-in')
        .setDescription('Opt in to receive performance data for students')
        .addStringOption(option => option
            .setName('email')
            .setRequired(true)
            .setDescription('Please provide with your Piazza Email')),
    async execute(interaction, mongoose) {
        if (!interaction.guild) {
            await interaction.reply('This command can only be used in a server');
            return;
        }
        const email = interaction.options.getString('email');
        const id = interaction.member.id;
        studentFunc.save(email, id, true, mongoose);
        await interaction.reply(`Your Piazza email: ${email}`);
    },
}
