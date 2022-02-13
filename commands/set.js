const { Constants, MessageEmbed } = require('discord.js');

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
				choices: [
					{
						name: "english",
						value: "en",	
					},
					{
						name: "espanol",
						value: "sp",	
					},
					{
						name: "हिंदी",
						value: "hi",	
					},
					{
						name: "中文",
						value: "cn",	
					},
					{
						name: "türk",
						value: "tr",	
					},
					{
						name: "deutsch",
						value: "de",	
					},
					{
						name: "עברית",
						value: "hb",	
					},
					{
						name: "italiano",
						value: "it",	
					},
					{
						name: "čeština",
						value: "cs"
					}
				]
			}
		]
	},

	default: async (interaction, lang) => {
		const { commandName, options } = interaction;

		const { lang_db: db } = require('../index');
		const { nolang, seterror } = require(`../lang/${lang}.json`);
		const { prefix, langinfo } = require('../config.json');

		if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({
			content: `:x: | ${seterror}`,
			ephemeral: true
		}); //Checks to see if you have admin perms

		const language = options.getString("language");

		// Checks if language is in the accepted languages list
		// Someone might use HTTP requests to send arbitrary values to the bot for some reason, so we verify the language
		var languageValidated = false;
		for (l of langinfo) {
			if (l.includes(language)) {
				languageValidated = true;
			}
		}

		if (!languageValidated) return message.channel.send(nolang); 
		if (language !== "en") db.set(`lang_${interaction.guild.id}`, language);
		else db.delete(`lang_${interaction.guild.id}`);
		interaction.reply(require(`../lang/${language}.json`).langsus);
	}
}