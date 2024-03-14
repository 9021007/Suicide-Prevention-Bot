const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { __ } = require('../../bot.cjs');
const { website, themecolor } = require("../../config.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('See information about Suicide Prevention Bot'),
	async execute(interaction, lang) {

        const embed = new EmbedBuilder()
            .setTitle(__("Suicide Prevention Bot", lang))
            .setDescription(__("Suicide Prevention Bot is a Discord bot that checks messages for content that could indicate signs of suicide, and responds directing people to crisis counselors. It is completely anonymous. To opt out of recieving responses form the bot, use `/optout`.", lang))
            .setColor(themecolor)
            .setURL(website)
            .setThumbnail(website + "/img/siround.png")


		await interaction.reply({ embeds: [embed] });
	},
};