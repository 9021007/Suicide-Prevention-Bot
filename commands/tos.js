const { MessageEmbed } = require('discord.js');

module.exports = {
	command: {
		name: "tos",
		description: "Points you to the Terms of Service",
		options: []
	},

	default: async (interaction, lang) => {
		const { __ } = require('../bot.js');

		const embed = new MessageEmbed()
			.setColor('#04d384')
			.setTitle(__('tostitle', lang))
			.setThumbnail('https://spbot.ml/siround.png')
			.setURL('https://spbot.ml/')
			.setDescription(__('tosdesc', lang));
		interaction.reply({ embeds: [embed] });
	}
}