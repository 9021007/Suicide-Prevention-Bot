//const unleet = import('@cityssm/unleet');
const { MessageEmbed } = require('discord.js');

module.exports = async (message, lang, LCM) => {
	const { triggers, insults } = require('../database/triggers.json');
	const { __ } = require('../bot.js');
	const line = require('../database/quotes.json');

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
			.setAuthor({
				name: __("This bot has automatically detected a keyword related to suicide", lang),
				iconURL: 'https://spbot.ml/siround.png'
			})
			.setTitle(`${__("We care about you.", lang)} ${__("Please give the helpline just one chance.", lang)}`)
			.setDescription(`${line[Math.round(Math.random() * (line.length - 1))]}\n\n${__("Your life is important. We all care very deeply about you. I understand you don't feel like you matter right know, but I can tell you with 100% confidence that you do. I know you might be reluctant, but please just give the suicide prevention hotline just one more chance.", lang)}`)
			.addField(__("United States", lang), __("Call (800) 273-8255 or Text HOME to 741741", lang), true)
			.addField(__("United Kingdom", lang), __("Call 116-123 or Text SHOUT to 85258", lang), true)
			.addField(__("Canada", lang), __("Call (833) 456-4566 or Text 45645", lang), true)
			.addField(__("India", lang), __("Call +91 80 23655557", lang), true)
			.addField(__("Japan", lang), __("Call 810352869090", lang), true)
			.addField(__("Other Countries?", lang), __("[Click Here.](https://spbot.ml/hotlines)", lang), true)
			.addField(__("Need Extra Support?", lang), "Test **DISCORD** to **741741** from anywhere in the United States to chat with a trained colunteer crisis counselor at Crisis Text Line. Counselors are available 24/7 to help you are a friend through any mental health crisis.", false)
			//__("Come talk to real people to help you through this Discord! [Click here.](https://discord.gg/sdY4jyY)", lang)
			.setFooter({
				text: __('I care about you. Please try to give the helplines just one chance. I know you can make it through this. Report a bug: https://discord.gg/YHvfUqVgWS. Website: https://spbot.ml/. Type /dmmute to prevent others from telling me to send you DMs', lang),
				iconURL: 'https://spbot.ml/siround.png'
			});
		return message.author.send({ embeds: [suicide] }).catch(e => {
			(message.reply({ embeds: [suicide] })) //send message in channel if dm is closed
		})
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
				.setTitle(__("Suicide Prevention Bot", lang))
				.setAuthor({
					name: __("Please don't tell others to kill themselves", lang),
					iconURL: 'https://spbot.ml/siround.png'
				})
				.setDescription(__("This is not a laughing matter", lang));
			return message.channel.send({ embeds: [insult] }).catch(console.error);
		}
	}
};