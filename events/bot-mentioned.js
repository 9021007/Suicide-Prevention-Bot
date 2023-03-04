module.exports = async (message, lang) => {
    const { EmbedBuilder } = require('discord.js');
	const line = require('../database/quotes.json');
	const { __ } = require('../bot.js');

	const suicide = new EmbedBuilder()
		.setColor('#04d384')
		.setTitle(__("botmentionedauthor", lang))
		.setAuthor({
			name: __("botmentionedauthor", lang),
			iconURL: 'https://spbot.ml/siround.png'
		})
		.setTitle(`${__("dmf1", lang)} ${__("dmauthor", lang)}`)
		.setDescription(`${line[Math.round(Math.random() * (line.length - 1))]}\n\n${__("dmf1d", lang)}`)
		.addFields([
			{ name: __("dmf2", lang), value: __("dmf2d", lang), inline: true },
			{ name: __("dmf3", lang), value: __("dmf3d", lang), inline: true },
			{ name: __("dmf4", lang), value: __("dmf4d", lang), inline: true },
			{ name: __("dmf5", lang), value: __("dmf5d", lang), inline: true },
			{ name: __("dmf6", lang), value: __("dmf6d", lang), inline: true },
			{ name: __("dmf7", lang), value: __("dmf7d", lang), inline: true },
			{ name: __("dmf8", lang), value: __("dmf8d", lang), inline: false },
		])
		.setFooter({
			text: __('dmfooter', lang),
			iconURL: 'https://spbot.ml/siround.png'
		});

    return message.channel.send({ embeds: [suicide] });
};