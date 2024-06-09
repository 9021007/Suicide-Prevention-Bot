const { SlashCommandBuilder } = require('discord.js');
const { __ } = require('../../bot.cjs');




module.exports = {


    data: new SlashCommandBuilder()
        .setName('optout')
        .setDescription('Opts yourself out of bot replies'),
    async execute(interaction, lang) {
        import('../../database.mjs').then((db) => {
            db.setMutedUser(interaction.user.id, true);
            interaction.reply({content: __("You have successfully opted out of bot replies. To opt back in, use `/optin`", lang), ephemeral: true });
        });
    },
};

