const { EmbedBuilder } = require('discord.js');

module.exports = {
	command: {
		name: "invite",
		description: "Displays an invite link, to add the bot to your server.",
		options: []
	},

	default: async (interaction, lang) => {
		const { __ } = require("../bot.js");

		const invite = new EmbedBuilder()
			.setColor('#04d384')
			.setTitle(__("invitetitle", lang))
			.setThumbnail('https://spbot.9021007.xyz/siround.png')
			.setURL('https://spbot.9021007.xyz')
			.setDescription(__("invitedesc", lang));
		interaction.reply({ embeds: [invite] });
	}
};