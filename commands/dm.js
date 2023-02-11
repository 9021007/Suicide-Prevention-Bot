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

			.setFooter({
				text: __('dmfooter', lang),
				iconURL: 'https://spbot.ml/siround.png'
			});

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
			
		interaction.client.users.fetch(options.getUser("user").id).then(user => {
			if (db.get(`dmmute_${user.id}`)) return interaction.reply({ content: __("dmoptout", lang), ephemeral: true }); //Check to see if you muted the bot (User side only)

			//Timeout
			if (DMTimeoutArray.includes(user.id)) return interaction.reply({ content: __("dmtimeout", lang), ephemeral: true });
			DMTimeoutArray.push(user.id);
			setTimeout(() => {
				const index = DMTimeoutArray.findIndex(item => item == user.id);
				DMTimeoutArray = DMTimeoutArray.splice(index);
			}, dmTimeout_MINUTES);


			user.send({ embeds: [dmembed], components: [row] }).then(() => {
				interaction.reply({ content: __("dmsent", lang), ephemeral: true });

			}).catch(e => {
				interaction.reply({ content: __("dmdenied", lang), ephemeral: true }); //If dm command has an error
			});
		});
	}
};