const {SlashCommandBuilder} = require('@discordjs/builders');
const exportCSV = require('../utils/exportCSV');
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('download-csv')
        .setDescription('Generates a CSV file of performance data.'),
    async execute(interaction, mongoose) {
        // todo:gi
        exportCSV.saveCSV(mongoose);
        await interaction.reply({content: 'CSV file generated.', files: [{attachment: './piazza.csv', name: 'piazza.csv'}],});
    },
}
