const { MessageEmbed } = require('discord.js');

module.exports = {
     command: {
		name: "info",
		description: "Displays information about the bot.",
		options: []
	},

     default: async (interaction, lang) => {
		const { __ } = require("../bot.js");

		const info = new MessageEmbed()
			.setColor('#04d384')
			.setAuthor({
				name: __("infoauthor", lang),
				iconURL: 'https://spbot.ml/siround.png'
			})
			.setTitle(__("infotitle", lang))
			.setURL('https://spbot.ml')
			.setThumbnail('https://spbot.ml/siround.png')
			.addField(__("infof1", lang), __("infof1d", lang))
			.addField(__("infof2", lang), __("infof2d", lang))
			.addField(__("infof3", lang), __("infof3d", lang))
			.addField(__("infof4", lang), __("infof4d", lang))
			.setImage('https://spbot.ml/sc2.png')
			.setFooter({
				text: __("infofooter", lang),
				iconURL: 'https://spbot.ml/siround.png'
			});
		interaction.reply({ embeds: [info] });
     }

     
};