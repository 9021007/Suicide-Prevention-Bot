const { MessageEmbed } = require('discord.js');

module.exports = {
	command: {
		name: "help",
		description: "Displays a help page",
		options: []
	},

	default: async (interaction, lang) => {
		const { __ } = require("../bot.js");

		const help = new MessageEmbed()
			.setColor('#04d384')
			.setAuthor({
				name: __("helpauthor", lang),
				iconURL: 'https://spbot.ml/siround.png'
			})
			.setTitle(__("helptitle", lang))
			.setURL('https://spbot.ml')
			.addField(__("helpf1", lang), __("helpf1d", lang))
			.addField(__("helpf2", lang), __("helpf2d", lang))
			.addField(__("helpf3", lang), __("helpf3d", lang));
		interaction.reply({ embeds: [help] });
	}
};