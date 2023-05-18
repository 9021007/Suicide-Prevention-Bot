const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');

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
				iconURL: `https://${config.domain}/siround.png`
			})
			.setTitle(__("infotitle", lang))
			.setURL(`https://${config.domain}`)
			.setThumbnail(`https://${config.domain}/siround.png`)
			.addFields([
				{ name: __("infof1", lang), value: __("infof1d", lang) },
				{ name: __("infof2", lang), value: __("infof2d", lang) },
				{ name: __("infof3", lang), value: __("infof3d", lang) },
				{ name: __("infof4", lang), value: __("infof4d", lang) },
			])
			.setImage(`https://${config.domain}/sc2.png`)
			.setFooter({
				text: __("infofooter", lang),
				iconURL: `https://${config.domain}/siround.png`
			});
		interaction.reply({ embeds: [info] });
     }

     
};