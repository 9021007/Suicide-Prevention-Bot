/*

for the record bobrobot told me to do this
if this breaks it's not my fault

*/
var DMTimeoutArray = [];

module.exports = async (message, lang) => {
     let mention = message.mentions.users.first();

     if(DMTimeoutArray.includes(mention.id)) return message.channel.send("This user has already been messaged in the last 15 minutes, please wait and try again.");
     
     DMTimeoutArray.push(mention.id);
     setTimeout(() => {
          const index = DMTimeoutArray.findIndex(item => item == mention.id);
          DMTimeoutArray = DMTimeoutArray.splice(index);
     }, 15 * 60 * 1000);

     const { MessageEmbed } = require('discord.js');
     const {
          dmembedtitle, 
          dmembedauthor, 
          dmembeddescription, 
          dmembedfield1heading, 
          dmembedfield1, 
          dmembedfield2heading, 
          dmembedfield2, 
          dmembedfield3heading, 
          dmembedfield3, 
          dmembedfield4heading, 
          dmembedfield4, 
          dmembedfield5heading, 
          dmembedfield5, 
          dmembedfield6heading, 
          dmembedfield6, 
          dmembedfield7heading, 
          dmembedfield7, 
          dmembedfield8heading, 
          dmembedfield8, 
          dmmute4, 
          dmmute5, 
          mention, 
          mention1, 
          sent
     } = require(`../lang/${lang}.json`);

     if (!mention) return message.channel.send(mention1); // checking if message don't have a user mention
     if (db.get(`dmmute_${message.author.id}`)) return message.channel.send(dmmute5); //Check to see if you muted the bot (User side only)
     message.channel.send(sent);

    
     const dmembed = new MessageEmbed()
          .setColor('#04d384')
          .setTitle(`${dmembedtitle}`)
          .setURL('https://spbot.ml/')
          .setImage('https://www.spbot.ml/suicideicon.png')
          .setAuthor(`${dmembedauthor}`, 'https://spbot.ml/siround.png')
          .setDescription(`${dmembeddescription}`)
          .addField(`${dmembedfield1heading}`, `${dmembedfield1}`, false)
          .addField(`${dmembedfield2heading}`, `${dmembedfield2}`, true)
          .addField(`${dmembedfield3heading}`, `${dmembedfield3}`, true)
          .addField(`${dmembedfield4heading}`, `${dmembedfield4}`, true)
          .addField(`${dmembedfield5heading}`, `${dmembedfield5}`, true)
          .addField(`${dmembedfield6heading}`, `${dmembedfield6}`, true)
          .addField(`${dmembedfield7heading}`, `${dmembedfield7}`, true)
          .addField(`${dmembedfield8heading}`, `${dmembedfield8}`, false)
          .setFooter('I care about you. Please try to give the helplines just one chance. I know you can make it through this. Report a bug: https://discord.gg/YHvfUqVgWS. Website: https://spbot.ml/. Type sp!dmmute to prevent others from telling me to send you DMs', 'https://spbot.ml/siround.png');

     mention.send({ embeds: [dmembed] }).catch(e => {
          console.error(e);
          message.channel.send(dmmute4); //If dm command has an error
     });
};