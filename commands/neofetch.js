module.exports = async (message, lang) => {
	const { MessageEmbed } = require('discord.js');
	const { 
		bot2, 
		bot3, 
		bot4
	} = require(`../lang/${lang}.json`);
	const {client} = require('../index');

     const cpuemoji = client.emojis.cache.get("837909574966968371");
	const pcemoji = client.emojis.cache.get("837909575034339369");
	const hddemoji = client.emojis.cache.get("837909575101448244");
    	const ramemoji = client.emojis.cache.get("837909575415234590");
    	const logoemoji = client.emojis.cache.get("832187920676421672");
    	const os = require('os');
    	const core = os.cpus()[0];
    	const { version: djsversion } = require("discord.js");
    	const { version } = require('../config.json');
    	const bot = new MessageEmbed() // No need to be translated!
      	.setColor('#04d384')
      	.setFooter(bot2)
      	.addFields(
        		{name: `**❯ ${bot3}** ${client.user.tag} (${client.user.id})`,value: `**❯ ${bot4}** ${client.guilds.cache.size.toLocaleString()} `},
      	)
      	.addFields(
        		{name: `**❯ ${pcemoji}:** ${Math.floor(client.uptime / 86400000)}d ${Math.floor(client.uptime / 3600000) % 24}hr ${Math.floor(client.uptime / 60000) % 60}min ${Math.floor(client.uptime / 1000) % 60}sec`,value: '\u200b'},
        		{name: `**❯ ${hddemoji}:** ${os.platform()},${os.release()}`,value: '\u200b'},
        		{name: `**❯ ${cpuemoji}:** ${core.model} - ${os.cpus().length} x ${core.speed}MHz`, value: '\u200b'},
        		{name: `**❯ ${ramemoji}:** ${Math.floor(((os.freemem()) / 10000000)) / 100}GiB/${Math.floor(((os.totalmem()) / 10000000)) / 100}GiB`,value: '\u200b'},
        		{name: `**❯ Bot:**`,value: `Node.js: ${process.version} - Discord.js: v${djsversion} - ${logoemoji}: v${version}`},
      	)
      	.setTimestamp();
    	message.channel.send({ embeds: [bot] });
};