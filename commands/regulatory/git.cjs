const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { __ } = require('../../bot.cjs');
const { website, themecolor, github } = require("../../config.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('git')
		.setDescription('Displays open source information'),
	async execute(interaction, lang) {

        const embed = new EmbedBuilder()
            .setTitle(__("Suicide Prevention Bot is Open Source!", lang))
            .setDescription(__("If you would like to help with the development of the bot or even run your own instance, check out the GitHub repository. It is available at", lang) + " " + github)
            .setColor(themecolor)
            .setURL(github)
            .setThumbnail(website + "/img/siround.png")


		await interaction.reply({ embeds: [embed] });
	},
};