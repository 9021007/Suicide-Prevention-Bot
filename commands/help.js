const { MessageEmbed } = require('discord.js');
module.exports = {
     command: {
		name: "help",
		description: "Displays a help page",
		options: []
	},
     
     default: async (interaction, lang) => {
          const {
               helpcommands, 
               helplinks, 
               helpauthor, 
               helptitle, 
               helpfield1heading, 
               helpfield2heading, 
               helpfield3heading, 
               helpfield3
          } = require(`../lang/${lang}.json`);

          const help = new MessageEmbed()
               .setColor('#04d384')
			   .setAuthor({
				   name: helpauthor,
				   iconURL: 'https://spbot.ml/siround.png'
			   })
               .setTitle(helptitle)
               .setURL('https://spbot.ml')
               .addField(helpfield1heading, helpcommands)
               .addField(helpfield2heading, helplinks)
               .addField(helpfield3heading, helpfield3);
          interaction.reply({ embeds: [help] });
}
};