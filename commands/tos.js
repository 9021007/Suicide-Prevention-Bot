const { MessageEmbed } = require('discord.js');

module.exports = {
	command: {
		name: "tos",
		description: "Points you to the Terms of Service",
		options: []
	},

	default: async (interaction, lang) => {
		const { __ } = require('../index');

		const embed = new MessageEmbed()
			.setColor('#04d384')
			.setTitle(__('Terms of Service', lang))
			.setThumbnail('https://spbot.ml/siround.png')
			.setURL('https://spbot.ml/')
			.setDescription(__('See our terms of service at https://spbot.ml/terms.txt', lang));
		interaction.reply({ embeds: [embed] });
	}
}