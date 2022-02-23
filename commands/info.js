const { MessageEmbed } = require('discord.js');

module.exports = {
     command: {
		name: "info",
		description: "Displays information about the bot.",
		options: []
	},

     default: async (interaction, lang) => {
          const {
               infotitle, 
               infoauthor, 
               infofield1heading, 
               infofield1, 
               infofield2heading, 
               infofield2, 
               infofield3heading, 
               infofield3, 
               infofield4heading, 
               infofield4, 
               infofooter
          } = require(`../lang/${lang}.json`);

     const info = new MessageEmbed()
          .setColor('#04d384')
          .setAuthor({
			name: infoauthor,
			iconURL: 'https://spbot.ml/siround.png'
		  })
          .setTitle(infotitle)
          .setURL('https://spbot.ml')
          .setThumbnail('https://spbot.ml/siround.png')
          .addField(infofield1heading, infofield1)
          .addField(infofield2heading, infofield2)
          .addField(infofield3heading, infofield3)
          .addField(infofield4heading, infofield4)
          .setImage('https://spbot.ml/sc2.png')
          .setFooter({
			  text: infofooter
		  });
     interaction.reply({ embeds: [info] });
     }

     
};