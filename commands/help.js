const { EmbedBuilder } = require('discord.js');

module.exports = {
	command: {
		name: "help",
		description: "Displays a help page",
		options: []
	},

	default: async (interaction, lang) => {
		const { __ } = require("../bot.js");

		const help = new EmbedBuilder()
			.setColor('#04d384')
			.setAuthor({
				name: __("helpauthor", lang),
				iconURL: 'https://spbot.9021007.xyz/siround.png'
			})
			.setTitle(__("helptitle", lang))
			.setURL('https://spbot.9021007.xyz')
			.addFields([
				{ name: __("helpf1", lang), value: __("helpf1d", lang) },
				{ name: __("helpf2", lang), value: __("helpf2d", lang) },
				{ name: __("helpf3", lang), value: __("helpf3d", lang) },
			])
		interaction.reply({ embeds: [help] });
	}
};