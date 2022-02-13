module.exports = async (message, lang) => {
	const { Client, Intents, MessageEmbed } = require('discord.js');
	const { 
		suicidetitle, 
		suicideauthor, 
		suicidedescription, 
		suicidefield1heading, 
		suicidefield1, 
		suicidefield2heading, 
		suicidefield2, 
		suicidefield3heading, 
		suicidefield3, 
		suicidefield4heading, 
		suicidefield4, 
		suicidefield5heading, 
		suicidefield5, 
		suicidefield6heading, 
		suicidefield6, 
		suicidefield7heading, 
		suicidefield7, 
		suicidefield8heading, 
		suicidefield8, 
		suicidefooter, 
		insulttitle, 
		insultauthor, 
		insultdescription,
	} = require(`../lang/${lang}.json`);
	const unleet = import('@cityssm/unleet');
	const {triggers, insults} = require('../database/triggers.json');

	let LCM = message.content.toLowerCase(); //Lower case message text
	try {
  		var possible_LCMs = (await unleet).default(LCM); // Returns an array of possible unl33ted messages (some l33tcodes may have different meanings)
	} catch (RangeError) {
		console.log("[-] WARNING: RangeError");
	}
	const commonElements = [];
	const parsedTriggers = triggers.map(x => x.replace(/\|/g, " *"));
	parsedTriggers.forEach(trigger => { // Loop ever each trigger and check if they match the message
		possible_LCMs.forEach(unleeted_LCM => { // Loop over every possible unleeted message to match with trigger
			if (new RegExp(trigger, "g").test(unleeted_LCM)) {
				commonElements.push(true);
			}
		});
	});
    if (commonElements.length > 0) {
		const suicide = new MessageEmbed()
	   		.setColor('#04d384')
	   		.setTitle(`${suicidetitle}`)
	   		.setAuthor(`${suicideauthor}`, 'https://spbot.ml/siround.png')
	   		.setDescription(`${suicidedescription}`)
			.addField(`${suicidefield1heading}`, `${suicidefield1}`, false)
	   		.addField(`${suicidefield2heading}`, `${suicidefield2}`, true)
	   		.addField(`${suicidefield3heading}`, `${suicidefield3}`, true)
	   		.addField(`${suicidefield4heading}`, `${suicidefield4}`, true)
	   		.addField(`${suicidefield5heading}`, `${suicidefield5}`, true)
	   		.addField(`${suicidefield6heading}`, `${suicidefield6}`, true)
	   		.addField(`${suicidefield7heading}`, `${suicidefield7}`, true)
			.addField(`${suicidefield8heading}`, `${suicidefield8}`, false)
			.setFooter(`${suicidefooter}`, 'https://spbot.ml/siround.png');
		return message.author.send({ embeds: [suicide] }).catch(e => message.channel.send(suicide));
	}
	let args = LCM.trim().split(/ +/);
	args = args.map(x => x.replace(/\t/g, ""));
	if (commonElements.length < 1) {
		const parsedInsultTriggers = insults.map(x => x.replace(/\|/g, " *"));
		parsedInsultTriggers.forEach(trigger => { // Loop ever each insult and check if they match the message
	   		possible_LCMs.forEach(unleeted_LCM => { // Loop over every possible unleeted message to match with insult
				if (new RegExp(trigger, "g").test(unleeted_LCM))
					commonElements.push(true);
			});
		});
		if (commonElements.length > 0) {
	   		const insult = new MessageEmbed()
				.setColor('#04d384')
				.setTitle(`${insulttitle}`)
				.setAuthor(`${insultauthor}`, 'https://spbot.ml/siround.png')
				.setDescription(`${insultdescription}`);
	   		return message.channel.send({ embeds: [insult] }).catch(console.error);
		}
	}
};