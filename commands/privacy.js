const { MessageEmbed } = require('discord.js');

module.exports = {
	command: {
		name: "privacy",
		description: "Points you to the Privacy Policy",
		options: []
	},

	default: async (interaction, lang) => {
		const { __ } = require('../bot.js');

		const embed = new MessageEmbed()
			.setColor('#04d384')
			.setTitle(__('pptitle', lang))
			.setThumbnail('https://spbot.ml/siround.png')
			.setURL('https://spbot.ml/')
			.setDescription(__('ppdesc', lang));
		interaction.reply({ embeds: [embed] });
	}
}