const { EmbedBuilder } = require('discord.js');

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
		name: "languages",
		description: "Displays available languages",
		options: [
			{
				name: 'input',
				description: 'Options for the blacklist feature',
				type: 3,
				required: true,
				choices: [
					{
						name: 'list',
						value: 'list',
					},
					{
						name: 'set',
						value: 'set',
					},
				],
			},
			{
				name: 'language',
				description: 'The language to use',
				type: 3,
				required: false,
				choices: languageChoices(),
			},
		]
	},

	default: async (interaction, lang) => {
		const { langlist } = require('../config.json');
		const { __, lang_db: db } = require("../bot.js");
		const input = interaction.options.getString('input')
		const newLanguage = interaction.options.getString('language')

		if (input === 'list') {
			const langs = new EmbedBuilder()
				.setColor('#04d384')
				.setTitle(__("langtitle", lang))
				.setThumbnail('https://spbot.ml/siround.png')
				.setAuthor({
					name: __("langauthor", lang)
				})
				.setDescription(langlist.join('\n'))
				.setURL('https://spbot.ml/')
				.addFields([
					{ name: __("langf1", lang), value: __("langf1d", lang) },
				])
			return interaction.reply({ embeds: [langs] });
		}
		if (input === 'set') {
			if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: ":x: | " + __("mustadmin", lang), ephemeral: true }); //Checks to see if you have admin perms
			if (!newLanguage) {
				return interaction.reply({ content: __("errorlangset", lang), ephemeral: true })
			}
			if (newLanguage !== "en") db.set(`lang_${interaction.guild.id}`, newLanguage);
			else db.delete(`lang_${interaction.guild.id}`);
			lang = newLanguage;
			return interaction.reply(__("lang1", lang));
		}
	}
};