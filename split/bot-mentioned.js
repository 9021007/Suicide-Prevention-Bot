module.exports = async (message, lang) => {
     const { Client, Intents, MessageEmbed } = require('discord.js');
     const { suicidetitle, 
          suicideauthor, 
          suicidedescription, 
          suicidefield1heading, 
          suicidefield1, 
          suicidefield2heading, 
          suicidefield2, 
          suicidefield3heading, 
          suicidefield3, 
          suicidefield4heading, 
          suicidefield4, 
          suicidefield5heading, 
          suicidefield5, 
          suicidefield6heading, 
          suicidefield6, 
          suicidefield7heading, 
          suicidefield7, 
          suicidefield8heading, 
          suicidefield8, 
          suicidefooter
     } = require(`../lang/${lang}.json`);

     const suicide = new MessageEmbed()
      .setColor('#04d384')
      .setTitle(`${suicidetitle}`)
      .setAuthor(`${suicideauthor}`, 'https://spbot.ml/siround.png')
      .setDescription(`${suicidedescription}`)
      .addField(`${suicidefield1heading}`, `${suicidefield1}`, false)
      .addField(`${suicidefield2heading}`, `${suicidefield2}`, true)
      .addField(`${suicidefield3heading}`, `${suicidefield3}`, true)
      .addField(`${suicidefield4heading}`, `${suicidefield4}`, true)
      .addField(`${suicidefield5heading}`, `${suicidefield5}`, true)
      .addField(`${suicidefield6heading}`, `${suicidefield6}`, true)
      .addField(`${suicidefield7heading}`, `${suicidefield7}`, true)
      .addField(`${suicidefield8heading}`, `${suicidefield8}`, false)
      .setFooter(`${suicidefooter}`, 'https://spbot.ml/siround.png');

    return message.channel.send({ embeds: [suicide] });
}