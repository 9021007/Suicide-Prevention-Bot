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

	default: async (interaction, lang) => {
		var { dmTimeout_MINUTES } = require('../config.json'); //Request config settings
		dmTimeout_MINUTES *= 60 * 1000;

		const { user_mutes_db: db, __ } = require('../bot.js'); //Request db

		const { options } = interaction;
		
		const dmembed = new MessageEmbed()
			.setColor('#04d384')
<<<<<<< Updated upstream
			.setTitle(__("A user has asked us to reach out to you", lang))
			.setURL('https://spbot.ml/')
			.setImage('https://www.spbot.ml/suicideicon.png')
			.setAuthor({
				name: __("Please give the helpline just one chance", lang),
				iconURL: 'https://spbot.ml/siround.png'
			})
			.setDescription(__("Somebody has asked us to reach out personally to you in your DMs. Please listen.\n", lang))
			.addField(__("We care about you.", lang), __("Your life is important. We all care very deeply about you. I understand you don't feel like you matter right know, but I can tell you with 100% confidence that you do. I know you might be reluctant, but please just give the suicide prevention hotline just one more chance.", lang), false)
			.addField(__("United States", lang), __("Call (800) 273-8255 or Text HOME to 741741", lang), true)
			.addField(__("United Kingdom", lang), __("Call 116-123 or Text SHOUT to 85258", lang), true)
			.addField(__("Canada", lang), __("Call (833) 456-4566 or Text 45645", lang), true)
			.addField(__("India", lang), __("Call +91 80 23655557", lang), true)
			.addField(__("Japan", lang), __("Call 810352869090", lang), true)
			.addField(__("Other Countries?", lang), __("[Click Here.](https://spbot.ml/hotlines)", lang), true)
			.addField(__("Need Extra Support?", lang), __("Come talk to real people to help you through this Discord! [Click here.](https://discord.gg/sdY4jyY)", lang), false)
=======
			.setAuthor({
				name: __("dmauthor", lang),
				iconURL: 'https://spbot.ml/siround.png'
			})
			.setTitle(__("dmtitle", lang))
			.setURL('https://spbot.ml/')
			.setImage('https://www.spbot.ml/suicideicon.png')
			.setDescription(`${__("dmdesc", lang)}\n\n${line[Math.round(Math.random() * (line.length - 1))]}`)
			.addField(__("dmf1", lang), __("dmf1d", lang), false)
			.addField(__("dmf2", lang), __("dmf2d", lang), true)
			.addField(__("dmf3", lang), __("dmf3d", lang), true)
			.addField(__("dmf4", lang), __("dmf4d", lang), true)
			.addField(__("dmf5", lang), __("dmf5d", lang), true)
			.addField(__("dmf6", lang), __("dmf6d", lang), true)
			.addField(__("dmf7", lang), __("dmf7d", lang), true)
			.addField(__("dmf8", lang), __("dmf8d", lang), false)
			//__("Come talk to real people to help you through this Discord! [Click here.](https://discord.gg/sdY4jyY)", lang)
>>>>>>> Stashed changes
			.setFooter({
				text: __('dmfooter', lang),
				iconURL: 'https://spbot.ml/siround.png'
			});
<<<<<<< Updated upstream
=======

			//Buttons
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setLabel("Want to remove access for users to send you a dm message? -->")
						.setStyle(2)
						.setCustomId("button1")
						.setDisabled(true),
					new MessageButton()
						.setLabel("Click me!")
						.setStyle(1)
						.setCustomId("button2")
						.setDisabled(false),
				);
>>>>>>> Stashed changes
			
		interaction.client.users.fetch(options.getUser("user").id).then(user => {
			if (db.get(`dmmute_${user.id}`)) return interaction.reply({ content: __("dmoptout", lang), ephemeral: true }); //Check to see if you muted the bot (User side only)

			//Timeout
			if (DMTimeoutArray.includes(user.id)) return interaction.reply({ content: __("dmtimeout", lang), ephemeral: true });
			DMTimeoutArray.push(user.id);
			setTimeout(() => {
				const index = DMTimeoutArray.findIndex(item => item == user.id);
				DMTimeoutArray = DMTimeoutArray.splice(index);
			}, dmTimeout_MINUTES);

			//Send message
<<<<<<< Updated upstream
			user.send({ embeds: [dmembed] }).then(() => {
				interaction.reply({ content: __("A help DM has been sent.", lang), ephemeral: true });
=======
			user.send({ embeds: [dmembed], components: [row] }).then(() => {
				interaction.reply({ content: __("dmsent", lang), ephemeral: true });
>>>>>>> Stashed changes
			}).catch(e => {
				interaction.reply({ content: __("dmdenied", lang), ephemeral: true }); //If dm command has an error
			});
		});
	}
};