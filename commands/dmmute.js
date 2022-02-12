module.exports = async (message, lang) => {
     const {db} = require('../index');
     const {
          dmmute2, 
          dmmute3
     } = require(`../lang/${lang}.json`);

     if (db.get(`dmmute_${message.author.id}`)) {
          db.delete(`dmmute_${message.author.id}`);
          message.channel.send(dmmute2);
     } else {
          db.set(`dmmute_${message.author.id}`, true);
          message.channel.send(dmmute3);
     }
};