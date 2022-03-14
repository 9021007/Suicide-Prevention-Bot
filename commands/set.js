const { Constants, MessageEmbed } = require('discord.js');

const languageChoices = () => {
	const { supportedLanguages } = require('../config.json');
	var languages = [];
	for (var l of supportedLanguages) {
		languages.push({
			name: l[2],
			value: l[0]
		});
	}
	return languages;
};

module.exports = {
	command: {
		name: "language",
		description: "Set language to use for the bot",
		options: [
			{
				name: "language",
				description: "The language to use",
				required: true,
				type: Constants.ApplicationCommandOptionTypes.STRING,
				choices: languageChoices(),
			}
		]
	},

	default: async (interaction, lang) => {
		const { commandName, options } = interaction;

		const { __, lang_db: db } = require('../index');
		const { supportedLanguages } = require('../config.json');

		if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({
			//content: `:x: | ${seterror}`,
			content: ":x: | " + __("You must be an administrator of this server to change the language!", lang),
			ephemeral: true
		}); //Checks to see if you have admin perms

		const newLanguage = options.getString("language");

		// Checks if language is in the accepted languages list
		// Someone might use HTTP requests to send arbitrary values to the bot for some reason, so we verify the language
		var languageValidated = false;
		for (var l of supportedLanguages) {
			if (l.includes(newLanguage)) {
				languageValidated = true;
			}
		}

		if (!languageValidated) return message.channel.send(__("That language is not supported. To see all languages use the command /lang", lang));
		if (newLanguage !== "en") db.set(`lang_${interaction.guild.id}`, newLanguage);
		else db.delete(`lang_${interaction.guild.id}`);
		lang = newLanguage;
		interaction.reply(__("Language successfully changed!", lang));
	}
};