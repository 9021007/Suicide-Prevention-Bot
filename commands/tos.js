const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = {
	command: {
		name: "tos",
		description: "Points you to the Terms of Service",
		options: []
	},

	default: async (interaction, lang) => {
		const { __ } = require('../bot.js');

		const embed = new EmbedBuilder()
			.setColor('#04d384')
			.setTitle(__('tostitle', lang))
			.setThumbnail(`https://${config.domain}/siround.png`)
			.setURL(`https://${config.domain}`)
			.setDescription(__('tosdesc', lang));
		interaction.reply({ embeds: [embed] });
	}
}