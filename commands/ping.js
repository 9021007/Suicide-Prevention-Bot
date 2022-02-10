module.exports = async (message, lang) => {
     const {MessageEmbed} = require('discord.js');
     const {client} = require('../index');
     const loading = client.emojis.cache.get("838616104687108117");
     message.channel.send(`${loading} Pinging...`).then((msg) => {
          msg.edit("\u200B");
          const ping = new MessageEmbed()
               .setColor('#04d384')
               .setTitle('Here is my ping young one')
               .setDescription(`Roundtrip latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms \nAPI Latency is ${Math.round(client.ws.ping)}ms`);
          msg.edit({ embeds: [ping] });
     });
     return;
};