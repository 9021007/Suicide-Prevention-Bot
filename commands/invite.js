module.exports = async (message, lang) => {
     const  {MessageEmbed } = require('discord.js');
     const {
          invitetitle, 
          invitedescription
     } = require(`../lang/${lang}.json`);

     const invite = new MessageEmbed()
          .setColor('#04d384')
          .setTitle(invitetitle)
          .setURL('https://spbot.ml/')
          .setDescription(invitedescription)
          .setImage('https://www.spbot.ml/suicideicon.png');
     message.channel.send({ embeds: [invite] });
};