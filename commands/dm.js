const { Constants, MessageEmbed } = require('discord.js');
const schema = require('../scripts/database.js')

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

		const { __ } = require('../index');
		let data = await schema.findOne({ guildId: interaction.guild.id })//Request db
		const { options } = interaction;
		
		const dmembed = new MessageEmbed()
			.setColor('#04d384')
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
			.setFooter({
				text: __('I care about you. Please try to give the helplines just one chance. I know you can make it through this. Report a bug: https://discord.gg/YHvfUqVgWS. Website: https://spbot.ml/. Type /dmmute to prevent others from telling me to send you DMs', lang),
				iconURL: 'https://spbot.ml/siround.png'
			});
			
		interaction.client.users.fetch(options.getUser("user").id).then(user => {
			if (data.DM_Mute.includes(user.id)) return interaction.reply({ content: __("Mentioned user has opted out of user-directed bot DMs.", lang), ephemeral: true }); //Check to see if you muted the bot (User side only)

			//Timeout
			if (DMTimeoutArray.includes(user.id)) return interaction.reply({ content: __("This user has already been messaged recently, please wait and try again.", lang), ephemeral: true });
			DMTimeoutArray.push(user.id);
			setTimeout(() => {
				const index = DMTimeoutArray.findIndex(item => item == user.id);
				DMTimeoutArray = DMTimeoutArray.splice(index);
			}, dmTimeout_MINUTES);

			//Send message
			user.send({ embeds: [dmembed] }).then(() => {
				interaction.reply({ content: __("A help DM has been sent.", lang), ephemeral: true });
			}).catch(e => {
				interaction.reply({ content: __("Unable to send DM. Error: Permission Denied (this user must have their DMs off)", lang), ephemeral: true }); //If dm command has an error
			});
		});
	}
};