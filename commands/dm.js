const { Constants, MessageEmbed } = require('discord.js');

var DMTimeoutArray = [];
module.exports = {
	command: {
		name: "dm",
		description: "DMs help hotlines to a user",
		options: [
			{
				name: "user",
				description: "The user to DM",
				required: true,
				type: Constants.ApplicationCommandOptionTypes.USER
			},
		]
	},

	//Timeout
	default: async (interaction, lang) => {
		var { dmTimeout_MINUTES } = require('../config.json'); //Request config settings
		dmTimeout_MINUTES *= 60 * 1000;

		const { user_mutes_db: db } = require('../index'); //Request db

		const { commandName, options } = interaction;
		const {
			dmembedtitle,
			dmembedauthor,
			dmembeddescription,
			dmembedfield1heading,
			dmembedfield1,
			dmembedfield2heading,
			dmembedfield2,
			dmembedfield3heading,
			dmembedfield3,
			dmembedfield4heading,
			dmembedfield4,
			dmembedfield5heading,
			dmembedfield5,
			dmembedfield6heading,
			dmembedfield6,
			dmembedfield7heading,
			dmembedfield7,
			dmembedfield8heading,
			dmembedfield8,
			dmmute4,
			dmmute5,
			mention1,
			sent
		} = require(`../lang/${lang}.json`); //Request lang stuff
		
		const dmembed = new MessageEmbed()
			.setColor('#04d384')
			.setTitle(`${dmembedtitle}`)
			.setURL('https://spbot.ml/')
			.setImage('https://www.spbot.ml/suicideicon.png')
			.setAuthor(`${dmembedauthor}`, 'https://spbot.ml/siround.png')
			.setDescription(`${dmembeddescription}`)
			.addField(`${dmembedfield1heading}`, `${dmembedfield1}`, false)
			.addField(`${dmembedfield2heading}`, `${dmembedfield2}`, true)
			.addField(`${dmembedfield3heading}`, `${dmembedfield3}`, true)
			.addField(`${dmembedfield4heading}`, `${dmembedfield4}`, true)
			.addField(`${dmembedfield5heading}`, `${dmembedfield5}`, true)
			.addField(`${dmembedfield6heading}`, `${dmembedfield6}`, true)
			.addField(`${dmembedfield7heading}`, `${dmembedfield7}`, true)
			.addField(`${dmembedfield8heading}`, `${dmembedfield8}`, false)
			.setFooter('I care about you. Please try to give the helplines just one chance. I know you can make it through this. Report a bug: https://discord.gg/YHvfUqVgWS. Website: https://spbot.ml/. Type sp!dmmute to prevent others from telling me to send you DMs', 'https://spbot.ml/siround.png');

		interaction.client.users.fetch(options.getUser("user").id).then(user => {
			if (db.get(`dmmute_${user.id}`)) return interaction.reply({ content: dmmute5, ephemeral: true }); //Check to see if you muted the bot (User side only)

			//Timeout command
			if (DMTimeoutArray.includes(user.id)) return interaction.reply({ content: "This user has already been messaged in the last 15 minutes, please wait and try again.", ephemeral: true })
			DMTimeoutArray.push(user.id);
			setTimeout(() => {
				const index = DMTimeoutArray.findIndex(item => item == user.id);
				DMTimeoutArray = DMTimeoutArray.splice(index);
			}, dmTimeout_MINUTES);

			//Send message
			user.send({ embeds: [dmembed] }).then(() => {
				interaction.reply({ content: sent, ephemeral: true })
			}).catch(e => {
				console.error(e);
				message.channel.send(dmmute4); //If dm command has an error
			});
		});
	}
}