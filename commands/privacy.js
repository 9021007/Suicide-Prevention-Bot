const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = {
	command: {
		name: "privacy",
		description: "Points you to the Privacy Policy",
		options: []
	},

	default: async (interaction, lang) => {
		const { __ } = require('../bot.js');

		const embed = new EmbedBuilder()
			.setColor('#04d384')
			.setTitle(__('pptitle', lang))
			.setThumbnail(`https://${config.domain}/siround.png`)
			.setURL(`https://${config.domain}`)
			.setDescription(__('ppdesc', lang));
		interaction.reply({ embeds: [embed] });
	}
}