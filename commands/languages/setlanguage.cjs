const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const { __ } = require('../../bot.cjs');
const { EmbedBuilder } = require('discord.js');
const { themecolor, website, supportedLanguages} = require('../../config.json')

const languageChoices = () => {
	var languages = [];
	for (var l of supportedLanguages) {
		languages.push({name: l[2], value: l[0]});
	}
	return languages;
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setlanguage')
		.setDescription('Sets the language that the bot will use in the server')
        .addStringOption(option =>
            option.setName('language')
            .setDescription('Which language do you want to use?')
            .setRequired(true)
            .addChoices(...languageChoices()) // the ... is the spread operator, which spreads the array into individual arguments
            ),
	async execute(interaction, lang) {
        import('../../database.mjs').then((db) => {
            if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) { // check for manage server permissions
                const language = interaction.options.getString('language'); // get the language from the command
                if (language) {
                    if (supportedLanguages.find(l => l[0] == language)) {
                        db.setServerLang(interaction.guildId, language);
                        interaction.reply(__("Language successfully changed!", language));
                    }
                }
            } else {
                interaction.reply(__("You must be an administrator of this server to change the language!", lang));
            }
        });
	},
};
