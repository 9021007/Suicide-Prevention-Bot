//const unleet = import('@cityssm/unleet');
const { EmbedBuilder } = require('discord.js');

module.exports = async (message, lang, LCM) => {
	const { triggers, insults, blacklist } = require('../database/triggers.json');
	const line = require('../database/quotes.json');
	const { __ } = require('../bot.js');

	const commonElements = [];
	const parsedTriggers = triggers.map(x => x.replace(/\|/g, " *"));
	parsedTriggers.forEach(trigger => {
		if (new RegExp(trigger, "g").test(LCM) == blacklist) { //Check to see if its in the global blacklist, if so, stop
			return;
		} else if (new RegExp(trigger, "g").test(LCM)) { //otherwise, continue on with whatever this is
			commonElements.push(true)
		}
	})

	if (LCM == blacklist) {
		return;
	}

	// var possible_LCMs = (await unleet).default(LCM); // Returns an array of possible unl33ted messages (some l33tcodes may have different meanings)
	// parsedTriggers.forEach(trigger => { // Loop ever each trigger and check if they match the message
	// 	possible_LCMs.forEach(unleeted_LCM => { // Loop over every possible unleeted message to match with trigger
	// 		if (new RegExp(trigger, "g").test(unleeted_LCM)) {
	// 			commonElements.push(true);
	// 		}
	// 	});
	// });

	if (commonElements.length > 0) {
		const suicide = new EmbedBuilder()
			.setColor('#04d384')
			.setTitle(__("botmentionedauthor", lang))
			.setAuthor({
				name: __("triggerauthor", lang),
				iconURL: 'https://spbot.9021007.xyz/siround.png'
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
				iconURL: 'https://spbot.9021007.xyz/siround.png'
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
			const insult = new EmbedBuilder()
				.setColor('#04d384')
				.setTitle(__("insulttitle", lang))
				.setAuthor({
					name: __("SPB", lang),
					iconURL: 'https://spbot.9021007.xyz/siround.png'
				})
				.setDescription(__("insultd", lang));
			return message.channel.send({ embeds: [insult] }).catch(console.error);
		}
	}
};