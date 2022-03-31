const {SlashCommandBuilder} = require("@discordjs/builders");
const executeBotPy = require("../utils/executeBotPy");
require("../models/InstructorData");
const {loginSaved} = require("../func/loginSaved");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("login")
        .setDescription("Log in with piazza email and password for instructor")
        .addStringOption(option => option
            .setName("email")
            .setRequired(true)
            .setDescription("Email address"))
        .addStringOption(option => option
            .setName("password")
            .setRequired(true)
            .setDescription("Password")
        )
        .addStringOption(option => option
            .setName("network-id")
            .setRequired(true)
            .setDescription("networkId")
        ),
    async execute(interaction, mongoose) {
        if (!interaction.guild) {
            await interaction.reply("This command can only be used in a server");
            return;
        }
        if (!interaction.member.permissions.has("ADMINISTRATOR" || "MANAGE_GUILD")) {
            await interaction.reply({
                content: "You do not have permission to use this command",
                ephemeral: true,
            });
            return;
        }
        const email = interaction.options.getString("email");
        const password = interaction.options.getString("password");
        const networkId = interaction.options.getString("network-id");

        const regex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(email)) {
            await executeBotPy.run(email, password, networkId)
                .then((value) => {
                    interaction.reply({
                        content: value,
                        ephemeral: true,
                    });
                    return value;
                })
                .then((value) => {
                    if (value.trim() === "Login success") {
                        const MemberID = interaction.user?.id;
                        const InstructorID = email;
                        const InstructorPassword = password;
                        const NetworkID = networkId;

                        loginSaved(
                            mongoose,
                            MemberID,
                            InstructorID,
                            InstructorPassword,
                            NetworkID
                        );
                        console.log("login success");
                    }
                });
        } else {
            await interaction.reply({
                content: "Invalid email address",
                ephemeral: true,
            });
        }
    },
};
