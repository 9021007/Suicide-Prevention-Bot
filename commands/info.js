const { MessageEmbed } = require('discord.js');

module.exports = {
     command: {
		name: "info",
		description: "Displays information about the bot.",
		options: []
	},

     default: async (interaction, lang) => {
		const { __ } = require("../index.js");

		const info = new MessageEmbed()
			.setColor('#04d384')
			.setAuthor({
				name: __("Suicide Prevention Bot Info", lang),
				iconURL: 'https://spbot.ml/siround.png'
			})
			.setTitle(__("What is this bot?", lang))
			.setURL('https://spbot.ml')
			.setThumbnail('https://spbot.ml/siround.png')
			.addField(__("What do you respond to?", lang), __("I look for key words related to suicide, as well as commands like /help, /invite, and /ping.", lang))
			.addField(__("How do I add you to my server?", lang), __("Go to https://spbot.ml/ and click on Invite Bot.", lang))
			.addField(__("Are you anonymous?", lang), __("Yes. I am, and have always been, 100% anonmyous. I'm open source as well.", lang))
			.addField(__("I have a bug report or feature request.", lang), __("[Join the discord!](https://discord.com/invite/YHvfUqVgWS)", lang))
			.setImage('https://spbot.ml/sc2.png')
			.setFooter({
				text: __("Created by the SPBot dev team :) · https://spbot.ml · /mute to have the bot ignore your messages", lang)
			});
		interaction.reply({ embeds: [info] });
     }

     
};