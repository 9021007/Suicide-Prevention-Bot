const { MessageEmbed } = require('discord.js');

module.exports = {
	command: {
		name: "tos",
		description: "Points you to the Terms of Service",
		options: []
	},

	default: async (interaction, lang) => {
		
		const {
			
		} = require(`../lang/${lang}.json`);

		const embed = new MessageEmbed()
			.setColor('#04d384')
			.setTitle("Terms of Service")
			.setThumbnail('https://spbot.ml/siround.png')
			.setURL('https://spbot.ml/')
			.setDescription("See our privacy polcy at https://spbot.ml/terms.txt");
		interaction.reply({ embeds: [embed] });
	}
}