const { MessageEmbed } = require('discord.js');

module.exports = {
	command: {
		name: "privacy",
		description: "Points you to the Privacy Policy",
		options: []
	},

	default: async (interaction, lang) => {
		const { __ } = require('../index');

		const embed = new MessageEmbed()
			.setColor('#04d384')
			.setTitle(__('Privacy Policy', lang))
			.setThumbnail('https://spbot.ml/siround.png')
			.setURL('https://spbot.ml/')
			.setDescription(__('See our privacy policy at https://spbot.ml/privacy.txt', lang));
		interaction.reply({ embeds: [embed] });
	}
}