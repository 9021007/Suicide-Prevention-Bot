module.exports = async (message, lang) => {
     const {MessageEmbed} = require('discord.js');

     const { langlist } = require('../config.json');
     const {
          langstitle, 
          langsauthor, 
          langsfield1heading, 
          langsfield1
     } = require(`../lang/${lang}.json`);

     const langs = new MessageEmbed()
          .setColor('#04d384')
          .setTitle(langstitle)
          .setAuthor(langsauthor)
          .setDescription(langlist.toString())
          .setURL('https://spbot.ml/')
          .addField(langsfield1heading, langsfield1)
          .setImage('https://www.spbot.ml/suicideicon.png');
     message.channel.send({ embeds: [langs] });
};