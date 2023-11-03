const { EmbedBuilder } = require('discord.js');

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
			.setThumbnail('https://spbot.9021007.xyz/siround.png')
			.setURL('https://spbot.9021007.xyz/policy.html')
			.setDescription(__('ppdesc', lang));
		interaction.reply({ embeds: [embed] });
	}
}
