const {saveLevels} = require("../func/saveLevels");
const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("customize-roles")
        .setDescription("Customize your three roles with incremental points")
        .addStringOption((option) => option
            .setName("l1")
            .setRequired(true)
            .setDescription("Enter your first role name in Roles setting."))
        .addStringOption((option) => option
            .setName("l2")
            .setRequired(true)
            .setDescription("Enter your second role name in Roles setting."))
        .addStringOption((option) => option
            .setName("l3")
            .setRequired(true)
            .setDescription("Enter your third role name in Roles setting."))
        .addIntegerOption((option) => option
            .setName("incremental")
            .setRequired(true)
            .setDescription("Set incremental value between level")),
    async execute(interaction, mongoose) {
        const guildId = interaction.guildId;
        const level1Name = interaction.options.getString("l1");
        const level2Name = interaction.options.getString("l2");
        const level3Name = interaction.options.getString("l3");
        const incrementalVal = interaction.options.getInteger("incremental");
        saveLevels(mongoose, guildId, level1Name, level2Name, level3Name, incrementalVal);
        await interaction.reply(`Level 1 name: ${level1Name}\n` + `Level 2 name: ${level2Name}\n` + `Level 3 name: ${level3Name}\n` + `increment : ${incrementalVal}`);
    },
};
