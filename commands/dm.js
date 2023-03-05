const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');

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
				type: 6
			},
		]
	},

	default: async (interaction, lang) => {
		var { dmTimeout_HOURS } = require('../config.json'); //Request config settings
		dmTimeout_HOURS *= 60 * 60 * 1000;

		const { user_mutes_db: db, __ } = require('../bot.js'); //Request db
		const line = require('../database/quotes.json');

		const { options } = interaction;
		
		const dmembed = new EmbedBuilder()
			.setColor('#04d384')
			.setAuthor({
				name: __("dmauthor", lang),
				iconURL: 'https://spbot.ml/siround.png'
			})
			.setTitle(__("dmtitle", lang))
			.setURL('https://spbot.ml/')
			.setImage('https://www.spbot.ml/suicideicon.png')
			.setDescription(`${__("dmdesc", lang)}\n\n${line[Math.round(Math.random() * (line.length - 1))]}`)
			.addFields([
				{ name: __("dmf1", lang), value: __("dmf1d", lang), inline: false },
				{ name: __("dmf2", lang), value: __("dmf2d", lang), inline: true },
				{ name: __("dmf3", lang), value: __("dmf3d", lang), inline: true },
				{ name: __("dmf4", lang), value: __("dmf4d", lang), inline: true },
				{ name: __("dmf5", lang), value: __("dmf5d", lang), inline: true },
				{ name: __("dmf6", lang), value: __("dmf6d", lang), inline: true },
				{ name: __("dmf7", lang), value: __("dmf7d", lang), inline: true },
				{ name: __("dmf8", lang), value: __("dmf8d", lang), inline: false },
			])
			//__("Come talk to real people to help you through this Discord! [Click here.](https://discord.gg/sdY4jyY)", lang)

			.setFooter({
				text: __('dmfooter', lang),
				iconURL: 'https://spbot.ml/siround.png'
			});

			//Buttons
			const row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setLabel("Want to remove access for users to send you a dm message? -->")
						.setStyle(2)
						.setCustomId("button1")
						.setDisabled(true),
					new ButtonBuilder()
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