module.exports = {
    name: "interactionCreate",
    async execute(interaction, mongoose) {
        if (!interaction.isCommand()) {
            return;
        }

        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction, mongoose);
        } catch (error) {
            console.error(error);
            await interaction.reply({content: `There was an error trying to execute that command!`, ephemeral: true});
        }
    }
}
