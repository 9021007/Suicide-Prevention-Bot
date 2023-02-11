//const unleet = import('@cityssm/unleet');
const { MessageEmbed } = require('discord.js');

module.exports = async (message, lang, LCM) => {
	const { triggers, insults } = require('../database/triggers.json');
	const line = require('../database/quotes.json');
	const { __ } = require('../bot.js');

	const commonElements = [];
	const parsedTriggers = triggers.map(x => x.replace(/\|/g, " *"));
	parsedTriggers.forEach(trigger => {
		if (new RegExp(trigger, "g").test(LCM)) {
			commonElements.push(true)
		}
	})

	// var possible_LCMs = (await unleet).default(LCM); // Returns an array of possible unl33ted messages (some l33tcodes may have different meanings)
	// parsedTriggers.forEach(trigger => { // Loop ever each trigger and check if they match the message
	// 	possible_LCMs.forEach(unleeted_LCM => { // Loop over every possible unleeted message to match with trigger
	// 		if (new RegExp(trigger, "g").test(unleeted_LCM)) {
	// 			commonElements.push(true);
	// 		}
	// 	});
	// });

	if (commonElements.length > 0) {
		const suicide = new MessageEmbed()
			.setColor('#04d384')
			.setTitle(__("Bot Mentioned. Here is my helpline embed: Suicide Prevention Bot", lang))
			.setAuthor({
				name: __("triggerauthor", lang),
				iconURL: 'https://spbot.ml/siround.png'
			})
			.setTitle(`${__("dmf1", lang)} ${__("dmauthor", lang)}`)
			.setDescription(`${line[Math.round(Math.random() * (line.length - 1))]}\n\n${__("Your life is important. We all care very deeply about you. I understand you don't feel like you matter right now, but I can tell you with 100% confidence that you do. I know you might be reluctant, but please just give the suicide prevention hotline just one more chance.", lang)}`)
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
		return message.author.send({ embeds: [suicide] })
	}

	let args = LCM.trim().split(/ +/);
	args = args.map(x => x.replace(/\t/g, ""));
	const parsedInsultTriggers = insults.map(x => x.replace(/\|/g, " *"));

	if (commonElements.length < 1) {
		parsedInsultTriggers.forEach(trigger => {
			if (new RegExp(trigger, "g").test(LCM)) {
				commonElements.push(true)
			}
		})
		// parsedInsultTriggers.forEach(trigger => { // Loop ever each insult and check if they match the message
		// 	possible_LCMs.forEach(unleeted_LCM => { // Loop over every possible unleeted message to match with insult
		// 		if (new RegExp(trigger, "g").test(unleeted_LCM)) {
		// 			commonElements.push(true);
		// 		}
		// 	});
		// });
		if (commonElements.length > 0) {
			const insult = new MessageEmbed()
				.setColor('#04d384')
				.setTitle(__("insulttitle", lang))
				.setAuthor({
					name: __("SPB", lang),
					iconURL: 'https://spbot.ml/siround.png'
				})
				.setDescription(__("insultd", lang));
			return message.channel.send({ embeds: [insult] }).catch(console.error);
		}
	}
};