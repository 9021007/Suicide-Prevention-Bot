module.exports = async (message, lang) => {
     const { MessageEmbed } = require('discord.js');
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
          .setAuthor(infoauthor, 'https://spbot.ml/siround.png')
          .setTitle(infotitle)
          .setURL('https://spbot.ml')
          .setThumbnail('https://spbot.ml/siround.png')
          .addField(infofield1heading, infofield1)
          .addField(infofield2heading, infofield2)
          .addField(infofield3heading, infofield3)
          .addField(infofield4heading, infofield4)
          .setImage('https://spbot.ml/sc2.png')
          .setFooter(infofooter);
     message.channel.send({ embeds: [info] });
};