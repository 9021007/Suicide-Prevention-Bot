const { Constants } = require('discord.js');
const schema = require('../scripts/database.js')

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
		const { options } = interaction;
		const { __ } = require('../index');
		const { supportedLanguages } = require('../config.json');

		if (!interaction.member.permissions.has("ADMINISTRATOR")) {
			return interaction.reply({ content: ":x: | " + __("You must be an administrator of this server to change the language!", lang), ephemeral: true });
		} //Checks to see if you have admin perms

		const newLanguage = options.getString("language");
		let data = await schema.findOne({ guildId: interaction.guild.id })

		// Checks if language is in the accepted languages list
		// Someone might use HTTP requests to send arbitrary values to the bot for some reason, so we verify the language
		var languageValidated = false;
		for (var l of supportedLanguages) {
			if (l.includes(newLanguage)) {
				languageValidated = true;
			}
		}

		if (!languageValidated) return interaction.reply(__("That language is not supported. To see all languages use the command /lang", lang));
		data.Lang = newLanguage
		await data.save()
		lang = newLanguage;
		interaction.reply(__("Language successfully changed!", lang));
	}
};