const { SlashCommandBuilder } = require('discord.js');
const { __ } = require('../../bot.cjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dmmute')
        .setDescription('Opts yourself out of user-directed DMs from the bot.'),
    async execute(interaction, lang) {
        import('../../database.mjs').then((db) => {
            db.setDmMutedUser(interaction.user.id, true);
            interaction.reply(__("You have successfully opted out of bot DMs. To opt back in, use `/dmunmute`", lang));
        });
    },
};

