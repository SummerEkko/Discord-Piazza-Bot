const {updateMetrics} = require("../func/updatedMetrics");
const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("set")
        .setDescription("Set parameters for points")
        .addIntegerOption((option) =>
            option
                .setName("p1")
                .setDescription("Questions asked")
                .setRequired(true)
                .setChoices([
                    ["1", 1],
                    ["2", 2],
                    ["3", 3],
                    ["4", 4],
                    ["5", 5],
                    ["6", 6],
                    ["7", 7],
                    ["8", 8],
                    ["9", 9],
                    ["10", 10],
                ])
        )
        .addIntegerOption((option) =>
            option
                .setName("p2")
                .setDescription("Answers to questions")
                .setRequired(true)
                .setChoices([
                    ["1", 1],
                    ["2", 2],
                    ["3", 3],
                    ["4", 4],
                    ["5", 5],
                    ["6", 6],
                    ["7", 7],
                    ["8", 8],
                    ["9", 9],
                    ["10", 10],
                ])
        )
        .addIntegerOption((option) =>
            option
                .setName("p3")
                .setDescription("Most views")
                .setRequired(true)
                .setChoices([
                    ["1", 1],
                    ["2", 2],
                    ["3", 3],
                    ["4", 4],
                    ["5", 5],
                    ["6", 6],
                    ["7", 7],
                    ["8", 8],
                    ["9", 9],
                    ["10", 10],
                ])
        )
        .addIntegerOption((option) =>
            option
                .setName("p4")
                .setDescription("Endorsement by other users")
                .setRequired(true)
                .setChoices([
                    ["1", 1],
                    ["2", 2],
                    ["3", 3],
                    ["4", 4],
                    ["5", 5],
                    ["6", 6],
                    ["7", 7],
                    ["8", 8],
                    ["9", 9],
                    ["10", 10],
                ])
        ),
    async execute(interaction, mongoose) {
        const ServerID = interaction.guild.id;
        const p1 = interaction.options.getInteger("p1");
        const p2 = interaction.options.getInteger("p2");
        const p3 = interaction.options.getInteger("p3");
        const p4 = interaction.options.getInteger("p4");

        updateMetrics(mongoose, ServerID, p1, p2, p3, p4);

        await interaction.reply(
            `Parameters:\n` +
            `Questions asked: ${p1}\n` +
            `Answers to questions: ${p2}\n` +
            `Most views: ${p3}\n` +
            `Endorsement by other users: ${p4}`
        );
    },
};
