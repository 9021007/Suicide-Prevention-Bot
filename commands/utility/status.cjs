const os = require('os');
const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { website, themecolor } = require("../../config.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Display the current status and statistics of the bot'),
	async execute(interaction, lang) {

        const { client, __ } = require('../../bot.cjs');
        const { version: djsversion } = require("discord.js");

        const servers = await client.shard.broadcastEval(c => c.guilds.cache.size)
		const users = await client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0))

        const inline = true;

        const embed = new EmbedBuilder()
            .setTitle(__("Status", lang))
            .addFields(
                { name: __("== Discord ==", lang), value: " ", inline: false },
                { name: __("Username", lang), value: client.user.username, inline: inline },
                { name: __("Tag", lang), value: client.user.discriminator.toString(), inline: inline },
                { name: __("ID", lang), value: client.user.id.toString(), inline: inline },
                { name: __("Total Servers", lang), value: servers.reduce((acc, guildCount) => acc + guildCount, 0).toString(), inline: inline },
                { name: __("Total Users", lang), value: users.reduce((acc, memberCount) => acc + memberCount, 0).toString(), inline: inline },
                { name: __("== Software ==", lang), value: " ", inline: false },
                { name: __("Discord.js", lang), value: "v" + djsversion, inline: inline },
                { name: __("Node.js", lang), value: process.version, inline: inline },
                { name: __("== Hardware ==", lang), value: " ", inline: false },
                { name: __("CPU", lang), value: os.cpus().map(i => `${i.model}`)[0], inline: inline },
                { name: __("CPU Usage", lang), value: `${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%`, inline: inline },
                { name: __("Memory Usage", lang), value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: inline },
                { name: __("Uptime", lang), value: `${Math.floor(process.uptime() / 3600)} hours, ${Math.floor(process.uptime() / 60) % 60} minutes, ${Math.floor(process.uptime() % 60)} seconds`, inline: inline }
            )
            .setDescription(__("This is the current status of the bot, including a variety of interesting statistics on its usage.", lang))
            .setColor(themecolor)
            .setThumbnail(website + "/img/siround.png")


		await interaction.reply({ embeds: [embed] });
    
	},
};