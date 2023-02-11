const { MessageEmbed } = require('discord.js');

module.exports = {
	command: {
		name: "invite",
		description: "Displays an invite link, to add the bot to your server.",
		options: []
	},

	default: async (interaction, lang) => {
		const { __ } = require("../bot.js");

		const invite = new MessageEmbed()
			.setColor('#04d384')
			.setTitle(__("invitetitle", lang))
			.setThumbnail('https://spbot.ml/siround.png')
			.setURL('https://spbot.ml/')
			.setDescription(__("invitedesc", lang));
		interaction.reply({ embeds: [invite] });
	}
};