const { MessageEmbed } = require("discord.js");

module.exports = {
	command: {
		name: "ping",
		description: "Returns bot info and ping",
		options: []
	},

	default: async (interaction, lang) => {
		const { client, __ } = require('../index');
		
		const loading = client.emojis.cache.get("838616104687108117");

		await interaction.reply({ content: `${loading} Pinging...` }).then(async () => {
			const ping = Date.now() - interaction.createdAt;
			const api_ping = client.ws.ping;

			await interaction.editReply({
				content: "\u200B",
				embeds: [
					new MessageEmbed()
						.setColor('#04d384')
						.setTitle(__('Here is my ping, young one', lang))
						.setDescription(__("Roundtrip latency is {{ping}}ms \nAPI Latency is {{latency}}ms", lang, { ping: ping, latency: Math.round(api_ping) }))
				]
			});
		});
	}
};