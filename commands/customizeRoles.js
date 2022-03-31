const { token, mongodb } = require("../config.json");
const mongoose = require("mongoose");
const levels = require("../utils/saveLevels");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  // @todo: instructor setting's parameter?
  // @todo: where to store?
  data: new SlashCommandBuilder()
    .setName("customize-roles")
    .setDescription("Customize your three roles with incremental points")
    .addStringOption((option) =>
      option
        .setName("l1")
        .setRequired(true)
        .setDescription("Enter your first role name in Roles setting.")
    )
    .addStringOption((option) =>
      option
        .setName("l2")
        .setRequired(true)
        .setDescription("Enter your second role name in Roles setting.")
    )
    .addStringOption((option) =>
      option
        .setName("l3")
        .setRequired(true)
        .setDescription("Enter your third role name in Roles setting.")
    )
    .addIntegerOption((option) =>
      option
        .setName("incrementval")
        .setRequired(true)
        .setDescription("Set incremental value between level")
    ),
  async execute(interaction) {
    const guildId = interaction.guildId;
    const level1Name = interaction.options.getString("l1");
    const level2Name = interaction.options.getString("l2");
    const level3Name = interaction.options.getString("l3");
    const incrementalVal = interaction.options.getInteger("incrementval");
    levels.saveLevels(
      guildId,
      level1Name,
      level2Name,
      level3Name,
      incrementalVal
    );
    // todo: store points parameter in database
    await interaction.reply(
      `Your input:\n` +
        `GuildID: ${guildId}\n` +
        `Level 1 name: ${level1Name}\n` +
        `Level 2 name: ${level2Name}\n` +
        `Level 3 name: ${level3Name}\n` +
        `increment : ${incrementalVal}`
    );
  },
};
