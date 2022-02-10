module.exports = async (message, lang) => {
     const {db} = require('../index');
     const {
          mute2,
          mute3
     } = require(`../lang/${lang}.json`);
     if (db.get(`mute_${message.author.id}`)) {
          db.delete(`mute_${message.author.id}`);
          message.channel.send(mute2);
     } else {
          db.set(`mute_${message.author.id}`, true);
          message.channel.send(mute3);
     }
};