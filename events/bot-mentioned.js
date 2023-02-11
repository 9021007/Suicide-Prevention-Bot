module.exports = async (message, lang) => {
    const { MessageEmbed } = require('discord.js');
	const line = require('../database/quotes.json');
	const { __ } = require('../bot.js');

	const suicide = new MessageEmbed()
		.setColor('#04d384')
		.setTitle(__("botmentionedauthor", lang))
		.setAuthor({
			name: __("botmentionedauthor", lang),
			iconURL: 'https://spbot.ml/siround.png'
		})
		.setTitle(`${__("dmf1", lang)} ${__("dmauthor", lang)}`)
		.setDescription(`${line[Math.round(Math.random() * (line.length - 1))]}\n\n${__("dmf1d", lang)}`)
		.addField(__("dmf2", lang), __("dmf2d", lang), true)
		.addField(__("dmf3", lang), __("dmf3d", lang), true)
		.addField(__("dmf4", lang), __("dmf4d", lang), true)
		.addField(__("dmf5", lang), __("dmf5d", lang), true)
		.addField(__("dmf6", lang), __("dmf6d", lang), true)
		.addField(__("dmf7", lang), __("dmf7d", lang), true)
		.addField(__("dmf8", lang), __("dmf8d", lang))
		.setFooter({
			text: __('dmfooter', lang),
			iconURL: 'https://spbot.ml/siround.png'
		});

    return message.channel.send({ embeds: [suicide] });
};