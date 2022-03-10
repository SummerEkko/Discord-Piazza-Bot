const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('login')
        .setDescription('Log in with piazza email and password for instructor')
        .addStringOption(option => option
            .setName('email')
            .setRequired(true)
            .setDescription('Email address'))
        .addStringOption(option => option
            .setName('password')
            .setRequired(true)
            .setDescription('Password')),
    async execute(interaction) {
        if (!interaction.guild) {
            await interaction.reply('This command can only be used in a server');
            return;
        }
        if (!interaction.member.permissions.has('ADMINISTRATOR' || 'MANAGE_GUILD')) {
            await interaction.reply({
                content: 'You do not have permission to use this command',
                ephemeral: true
            });
            return;
        }
        const email = interaction.options.getString('email');
        const password = interaction.options.getString('password');
        let reply = '';
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(email)) {
            //todo: check if already logged in
            //todo: check if can login
            //todo: how and where to store
            //todo: store guild id and channel id?
            reply =
                `Logging in as ${email}\n` +
                `Password: ${password}\n`;
        } else {
            reply = 'Invalid email address';
        }
        await interaction.reply({
            content: reply,
            ephemeral: true
        });
    },
}
