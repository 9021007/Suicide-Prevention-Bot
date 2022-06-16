const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require('os');

module.exports = {
	command: {
		name: "status",
		description: "Returns system info from bot",
		options: []
	},

	default: async (interaction, lang) => {
		const { client, __ } = require('../bot.js');

		const cpuemoji = client.emojis.cache.get("837909574966968371");
		const pcemoji = client.emojis.cache.get("837909575034339369");
		const hddemoji = client.emojis.cache.get("837909575101448244");
		const ramemoji = client.emojis.cache.get("837909575415234590");
		const logoemoji = client.emojis.cache.get("832187920676421672");
		const { version: djsversion } = require("discord.js");
		const { version } = require('../config.json');
		const promises = await client.shard.broadcastEval(client =>
			[
				client.shard.ids[0] + 1,
				client.guilds.cache.size,
				client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0),
				client.channels.cache.size,
				client.uptime,
				process.memoryUsage().heapUsed
			]
		);
		const servers = await client.shard.fetchClientValues('guilds.cache.size')
		const users = await client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0))
		let finale = "";


		promises.forEach((value) => {
			finale += `\`Shard ${value[0].toLocaleString()}:\` \n Servers: **${value[1].toLocaleString()}** | Users: **${value[2].toLocaleString()}** | Channels: **${value[3].toLocaleString()}** | Uptime: **${moment.duration(value[4]).format(" D [days], H [hrs], m [mins], s [secs]")}** | Memory Usage: **${formatBytes(value[5])}** \n\n`;
		});

		const embed = new MessageEmbed()
			.setColor('#04d384')
			.setDescription(`
				🔎 **Status**
				**= CLIENT =**
				**• Username** : ${client.user.username}
				**• Tag** : ${client.user.discriminator}
				**• ID** : ${client.user.id}
				\u200b
				**= STATISTICS =**
				**• Total Servers** : ${servers.reduce((acc, guildCount) => acc + guildCount, 0)}
				**• Total Users** : ${users.reduce((acc, memberCount) => acc + memberCount, 0)}
				**• Discord.js** : v${djsversion}
				**• Node.js** : ${process.version}
				**• ${logoemoji}** : v${version}
				\u200b
				**= SYSTEM =**
				**• ${hddemoji}** : ${os.platform()} | ${os.release()}
				**• ${pcemoji}** : ${moment.duration(interaction.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]")}
				**• ${cpuemoji}** :
				> **• Model** : ${os.cpus()[0].model} 
				> **• Speed** : ${os.cpus()[0].speed} MHz
				**•** ${ramemoji} :
				> **• Total Memory** : ${formatBytes(os.totalmem())}
				> **• Free Memory** : ${formatBytes(os.freemem())}
				> **• Heap Total** : ${formatBytes(process.memoryUsage().heapTotal)}
				> **• Heap Usage** : ${formatBytes(process.memoryUsage().heapUsed)}
			`)

		const embed2 = new MessageEmbed()
			.setColor('$04d384')
			.setFooter({
				text: __("Does not update after you send the command. Send again to see updated info.", lang),
				iconURL: 'https://spbot.ml/siround.png'
			})
			.setTimestamp()
			.setDescription(`
				**= SHARDS =**
				${finale}
			`)

		function formatBytes(a, b) {
			if (0 == a) return "0 Bytes";
			let c = 1024;
			let d = b || 2;
			let e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
			let f = Math.floor(Math.log(a) / Math.log(c));
			return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];
		}

		interaction.reply({ embeds: [embed] });
	}
};