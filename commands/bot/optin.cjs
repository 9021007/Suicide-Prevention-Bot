const { SlashCommandBuilder } = require('discord.js');
const { __ } = require('../../bot.cjs');




module.exports = {


    data: new SlashCommandBuilder()
        .setName('optin')
        .setDescription('Opts yourself into bot replies'),
    async execute(interaction, lang) {
        import('../../database.mjs').then((db) => {
            db.setMutedUser(interaction.user.id, false);
            interaction.reply({ content: __("You have successfully opted into bot replies. To opt out, use `/optout`", lang), ephemeral: true });
        });
    },
};

