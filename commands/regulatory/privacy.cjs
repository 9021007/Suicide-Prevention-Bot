const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { __ } = require('../../bot.cjs');
const { website, themecolor } = require("../../config.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('privacy')
		.setDescription('Displays Privacy Policy'),
	async execute(interaction, lang) {

        const embed = new EmbedBuilder()
            .setTitle(__("Privacy Policy", lang))
            .setDescription(__("See our privacy policy at", lang) + " " + website + "/privacy")
            .setColor(themecolor)
            .setURL(website + "/privacy")
            .setThumbnail(website + "/img/siround.png")


		await interaction.reply({ embeds: [embed] });
	},
};