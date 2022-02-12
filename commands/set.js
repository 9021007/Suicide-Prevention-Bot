module.exports = async (message, lang) => {
     const {db} = require('../index');
     const {
          nolang, 
          seterror
     } = require(`../lang/${lang}.json`);

     const { prefix, langinfo } = require('../config.json');

     if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`:x: | ${seterror}`); //Checks to see if you have admin perms

     const arguments = message.content.toLowerCase().slice(prefix.length).trim().split(' ');

     // Array for checking which language the user selected
     let langShort;
     for (l of langinfo) {
          if (l.includes(arguments[1])) {
               langShort = l[0];
          }
     }

     if (!langShort) return message.channel.send(nolang);
     if (langShort !== "en") db.set(`lang_${message.guild.id}`, langShort);
     else db.delete(`lang_${message.guild.id}`);
     message.channel.send(require(`../lang/${langShort}.json`).langsus);
};