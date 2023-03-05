const { EmbedBuilder } = require("discord.js");

module.exports = {
	command: {
		name: "ping",
		description: "Returns bot info and ping",
		options: []
	},

	default: async (interaction, lang) => {
		const { client, __ } = require('../bot.js');
		
		const loading = client.emojis.cache.get("838616104687108117");

		await interaction.reply({ content: `${loading} Pinging...` }).then(async () => {
			const ping = Date.now() - interaction.createdAt;
			const api_ping = client.ws.ping;

			await interaction.editReply({
				content: "\u200B",
				embeds: [
					new EmbedBuilder()
						.setColor('#04d384')
						.setTitle(__('pingtitle', lang))
						.setDescription(__("pingdesc", lang, { ping: ping, latency: Math.round(api_ping) }))
				]
			});
		});
	}
};