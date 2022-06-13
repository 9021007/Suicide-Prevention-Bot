const { MessageEmbed } = require('discord.js');

module.exports = {
	command: {
		name: "invite",
		description: "Displays an invite link, to add the bot to your server.",
		options: []
	},

	default: async (interaction, lang) => {
		const { __ } = require("../index.js");

		const invite = new MessageEmbed()
			.setColor('#04d384')
			.setTitle(__("Add Suicide Prevention Bot", lang))
			.setThumbnail('https://spbot.ml/siround.png')
			.setURL('https://spbot.ml/')
			.setDescription(__("This Discord bot is an easy-to-use and easy-to-install bot for Discord, that actively prevents suicide and other crisis from occuring. Add it to your Discord server in just 3 clicks.", lang));
		interaction.reply({ embeds: [invite] });
	}
};