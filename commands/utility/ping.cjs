const { SlashCommandBuilder } = require('discord.js');
const { __ } = require('../../bot.cjs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Makes sure that the bot is working'),
	async execute(interaction, lang) {
		await interaction.reply(__("Pong!", lang));
	},
};