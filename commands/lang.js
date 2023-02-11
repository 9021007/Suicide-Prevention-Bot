const { MessageEmbed } = require('discord.js');

module.exports = {
     command: {
		name: "languages",
		description: "Displays available languages",
		options: []
	},

     default: async (interaction, lang) => {
		const { langlist } = require('../config.json');
		const { __ } = require("../bot.js");
   
		const langs = new MessageEmbed()
			 .setColor('#04d384')
			 .setTitle(__("langtitle", lang))
			 .setThumbnail('https://spbot.ml/siround.png')
			 .setAuthor({
				 name: __("langauthor", lang)
			 })
			 .setDescription(langlist.join('\n'))
			 .setURL('https://spbot.ml/')
			 .addField(__("langf1", lang), __("langf1d", lang));
		interaction.reply({ embeds: [langs] });
	 }
};