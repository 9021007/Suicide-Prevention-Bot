const { SlashCommandBuilder } = require('discord.js');
const { __ } = require('../../bot.cjs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dmunmute')
        .setDescription('Opts yourself into user-directed DMs from the bot.'),
    async execute(interaction, lang) {
        import('../../database.mjs').then((db) => {
            db.setDmMutedUser(interaction.user.id, false);
            interaction.reply(__("You have successfully opted into bot DMs. To opt back out, use `/dmmute`", lang));
        });
    },
};

