const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
	command: {
		name: "ping",
		description: "Returns bot info and ping",
		options: []
	},

	default: async (interaction, lang) => {
		const { client } = require('../index');
		const loading = client.emojis.cache.get("838616104687108117");

		await interaction.reply({ content: `${loading} Pinging...` }).then(async () => {
			const ping = Date.now() - interaction.createdAt;
			const api_ping = client.ws.ping;

			await interaction.editReply({
				content: "\u200B",
				embeds: [
					new MessageEmbed()
						.setColor('#04d384')
						.setTitle('Here is my ping young one')
						.setDescription(`Roundtrip latency is ${ping}ms \nAPI Latency is ${Math.round(api_ping)}ms`)
				]
			});
		});
	}
}