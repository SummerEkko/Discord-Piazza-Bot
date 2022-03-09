const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set')
        .setDescription('Set parameters for points')
        .addIntegerOption(option =>
            option.setName('p1')
                .setDescription('first parameter')
                .setRequired(true)
                .setChoices([
                    ['1', 1],
                    ['2', 2],
                    ['3', 3],
                    ['4', 4],
                    ['5', 5],
                    ['6', 6],
                    ['7', 7],
                    ['8', 8],
                    ['9', 9],
                    ['10', 10]
                ])
        )
        .addIntegerOption(option =>
            option.setName('p2')
                .setDescription('second parameter')
                .setRequired(true)
                .setChoices([
                    ['1', 1],
                    ['2', 2],
                    ['3', 3],
                    ['4', 4],
                    ['5', 5],
                    ['6', 6],
                    ['7', 7],
                    ['8', 8],
                    ['9', 9],
                    ['10', 10]
                ])
        ),
    async execute(interaction) {
        const p1 = interaction.options.getInteger('p1');
        const p2 = interaction.options.getInteger('p2');
        await interaction.reply(
            `p1: ${p1}\np2: ${p2}`
        );
    },
}
