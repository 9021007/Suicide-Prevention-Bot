const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { __ } = require('../../bot.cjs');
const { website, themecolor, discord } = require("../../config.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('support')
		.setDescription('Need help? Get a Discord invite to the support server.'),
	async execute(interaction, lang) {

        const embed = new EmbedBuilder()
            .setTitle(__("Discord", lang))
            .setDescription(__("Need help? Join our discord server by visiting", lang) + " " + discord)
            .setColor(themecolor)
            .setURL(discord)
            .setThumbnail(website + "/img/siround.png")


		await interaction.reply({ embeds: [embed] });
	},
};