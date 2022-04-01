const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('download-csv')
        .setDescription('Generates a CSV file of performance data.'),
    async execute(interaction, mongoose) {
        await interaction.reply({content: 'CSV file generated.', files: [{attachment: './piazza.csv', name: 'piazza.csv'}],});
    },
}
