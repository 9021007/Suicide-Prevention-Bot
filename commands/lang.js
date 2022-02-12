const { MessageEmbed } = require('discord.js');

module.exports = {
     command: {
		name: "languages",
		description: "Displays available languages",
		options: []
	},

     default: async (interaction, lang) => {
		const { langlist } = require('../config.json');
		const { langstitle, langsauthor, langsfield1heading, langsfield1 } = require(`../lang/${lang}.json`);
   
		const langs = new MessageEmbed()
			 .setColor('#04d384')
			 .setTitle(langstitle)
			 .setAuthor(langsauthor)
			 .setDescription(langlist.toString())
			 .setURL('https://spbot.ml/')
			 .addField(langsfield1heading, langsfield1)
			 .setImage('https://www.spbot.ml/suicideicon.png');
		interaction.reply({ embeds: [langs] });
	 }
};