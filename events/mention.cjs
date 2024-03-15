const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { __ } = require('../bot.cjs');
const { website, themecolor } = require("../config.json")
const { returnEmbed } = require("./alert.cjs")

module.exports = {
	async execute(message, lang) {

        const newembed = returnEmbed(lang);
		console.log(newembed);
        newembed.setFooter({text: __("This message was displayed because the bot was mentioned", lang), iconURL: website + '/img/siround.png'})

		await message.reply({ embeds: [newembed] });
	},
};