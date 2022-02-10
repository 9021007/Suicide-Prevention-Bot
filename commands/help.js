module.exports = async (message, lang) => {
     const { MessageEmbed } = require('discord.js');
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
          .setAuthor(helpauthor, 'https://spbot.ml/siround.png')
          .setTitle(helptitle)
          .setURL('https://spbot.ml')
          .addField(helpfield1heading, helpcommands)
          .addField(helpfield2heading, helplinks)
          .addField(helpfield3heading, helpfield3);
     message.channel.send({ embeds: [help] });
};