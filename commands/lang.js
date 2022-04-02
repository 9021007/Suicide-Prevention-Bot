const { MessageEmbed } = require('discord.js');

module.exports = {
     command: {
		name: "languages",
		description: "Displays available languages",
		options: []
	},

     default: async (interaction, lang) => {
		const { langlist } = require('../config.json');
		const { __ } = require("../index.js");
   
		const langs = new MessageEmbed()
			 .setColor('#04d384')
			 .setTitle(__("Here are all the supported languages", lang))
			 .setThumbnail('https://spbot.ml/siround.png')
			 .setAuthor({
				 name: __("Suicide Prevention Bot Info", lang)
			 })
			 .setDescription(langlist.join('\n'))
			 .setURL('https://spbot.ml/')
			 .addField(__("Want more languages? Found a bug?", lang), __("[Join the discord!](https://discord.com/invite/YHvfUqVgWS)", lang));
		interaction.reply({ embeds: [langs] });
	 }
};