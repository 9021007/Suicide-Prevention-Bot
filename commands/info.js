const { EmbedBuilder } = require('discord.js');

module.exports = {
     command: {
		name: "info",
		description: "Displays information about the bot.",
		options: []
	},

     default: async (interaction, lang) => {
		const { __ } = require("../bot.js");

		const info = new EmbedBuilder()
			.setColor('#04d384')
			.setAuthor({
				name: __("infoauthor", lang),
				iconURL: 'https://spbot.ml/siround.png'
			})
			.setTitle(__("infotitle", lang))
			.setURL('https://spbot.9021007.xyz')
			.setThumbnail('https://spbot.ml/siround.png')
			.addFields([
				{ name: __("infof1", lang), value: __("infof1d", lang) },
				{ name: __("infof2", lang), value: __("infof2d", lang) },
				{ name: __("infof3", lang), value: __("infof3d", lang) },
				{ name: __("infof4", lang), value: __("infof4d", lang) },
			])
			.setImage('https://spbot.ml/sc2.png')
			.setFooter({
				text: __("infofooter", lang),
				iconURL: 'https://spbot.ml/siround.png'
			});
		interaction.reply({ embeds: [info] });
     }

     
};