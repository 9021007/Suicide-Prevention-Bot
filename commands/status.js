const { MessageEmbed, CommandInteraction, Client } = require("discord.js")
const moment = require("moment");
require("moment-duration-format");
const os = require('os')
const si = require('systeminformation');

module.exports = {
	command: {
		name: "status",
		description: "Returns system info from bot",
		options: []
	},

	default: async (interaction, lang) => {
		const { client } = require('../index');
		const { commandName, options } = interaction;
		const {
			bot2,
			bot3,
			bot4
		} = require(`../lang/${lang}.json`); //Request lang stuff

		const cpuemoji = client.emojis.cache.get("837909574966968371");
		const pcemoji = client.emojis.cache.get("837909575034339369");
		const hddemoji = client.emojis.cache.get("837909575101448244");
		const ramemoji = client.emojis.cache.get("837909575415234590");
		const logoemoji = client.emojis.cache.get("832187920676421672");
		const { version: djsversion } = require("discord.js");
		const { version } = require('../config.json');

		const embed = new MessageEmbed()
			.setColor('#04d384')
			.setFooter(bot2)
			.setDescription(`🔎 **Status**
**= CLIENT =**
**• Username** : ${client.user.username}
**• Tag** : ${client.user.discriminator}
**• ID** : ${client.user.id}
\u200b
**= STATISTICS =**
**• Servers** : ${client.guilds.cache.size.toLocaleString()}
**• Users** : ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
**• Discord.js** : v${djsversion}
**• Node.js** : ${process.version}
**• ${logoemoji} : v${version}
\u200b
**= SYSTEM =**
**• ${hddemoji}** : ${os.type}
**• ${pcemoji}** : ${moment.duration(interaction.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]")}
**• ${cpuemoji}** :
> **• Model** : ${os.cpus()[0].model} 
> **• Speed** : ${os.cpus()[0].speed} MHz
**• ${ramemoji}** :
> **• Total Memory** : ${(os.totalmem() / 1024 / 1024).toFixed(2)} Mbps
> **• Free Memory** : ${(os.freemem() / 1024 / 1024).toFixed(2)} Mbps
> **• Heap Total** : ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} Mbps
> **• Heap Usage** : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Mbps
`)
.setTimestamp();

		interaction.reply({ embeds: [embed] })
	}
}