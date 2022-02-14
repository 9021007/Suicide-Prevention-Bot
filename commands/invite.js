const { MessageEmbed } = require('discord.js');
module.exports = {
	command: {
		name: "invite",
		description: "Displays an invite link, to add the bot to your server.",
		options: []
	},

	default: async (interaction, lang) => {
		const {
			invitetitle, 
			invitedescription
		} = require(`../lang/${lang}.json`);

		const invite = new MessageEmbed()
			.setColor('#04d384')
			.setTitle(invitetitle)
			.setThumbnail('https://spbot.ml/siround.png')
			.setURL('https://spbot.ml/')
			.setDescription(invitedescription);
		interaction.reply({ embeds: [invite] });
	}
}