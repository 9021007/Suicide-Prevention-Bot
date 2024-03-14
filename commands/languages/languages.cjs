const { SlashCommandBuilder } = require('discord.js');
const { __ } = require('../../bot.cjs');
const { EmbedBuilder } = require('discord.js');
const { themecolor, website, supportedLanguages } = require('../../config.json')

const languageChoices = () => {
	var languages = [];
	for (var l of supportedLanguages) {
		languages.push(l[2]);
	}
	return languages;
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('languages')
		.setDescription('Lists available languages'),
	async execute(interaction, lang) {

        const embed = new EmbedBuilder()
            .setColor(themecolor)
            .setTitle(__("Here are all the supported languages", lang))
            .setURL(website)
            .setAuthor({ name: __("Suicide Prevention Bot Info", lang) })
            .setDescription(languageChoices().join('\n'))
            .setThumbnail(website + '/img/siround.png')
            .addFields({name: __("Want more languages? Found a bug?", lang), value: __("[Join the discord!](https://discord.com/invite/YHvfUqVgWS)", lang)});
        
        await interaction.reply({ embeds: [embed] });
	},
};
