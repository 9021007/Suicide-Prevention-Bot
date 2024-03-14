const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { __ } = require('../../bot.cjs');
const { website, themecolor } = require("../../config.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tos')
		.setDescription('Displays Terms of Service'),
	async execute(interaction, lang) {

        const embed = new EmbedBuilder()
            .setTitle(__("Terms of Service", lang))
            .setDescription(__("See our terms of service at", lang) + " " + website + "/terms")
            .setColor(themecolor)
            .setURL(website + "/terms")
            .setThumbnail(website + "/img/siround.png")


		await interaction.reply({ embeds: [embed] });
	},
};