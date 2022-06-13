const { Constants } = require('discord.js');
const schema = require('../scripts/database.js')

module.exports = {
	command: {
		name: "mute",
		description: "Toggle automatic message replies",
		options: [
			{
				name: "user",
				description: "Toggles preventing the bot from reacting to messages from your user",
				type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
				options: []
			},
			{
				name: "channel",
				description: "Toggles muting the bot in a channel",
				type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
				options: [
					{
						name: "channel",
						description: "Channel to mute/unmute",
						required: true,
						type: Constants.ApplicationCommandOptionTypes.CHANNEL
					}
				]
			},
		]
	},

	default: async (interaction, lang) => {
		const { options } = interaction;
		const { __ } = require('../index');
		let data = await schema.findOne({ guildId: interaction.guild.id })

		switch (options.getSubcommand()) {
			case "user": {
				if (data.User_Mute.includes(interaction.user.id)) {
					let array = data.User_Mute.filter(x => x !== interaction.user.id)
					data.User_Mute = array
					await data.save()
					return interaction.reply({ content: __("Removed from ignore list.", lang), ephemeral: true });
				} else {
					data.User_Mute.push(interaction.user.id)
					await data.save()
					return interaction.reply({ content: __("I will now ignore keywords you say in chat.", lang), ephemeral: true });
				}
			}
			case "channel": {
				if (!interaction.member.permissions.has("MANAGE_SERVER")) {
					return interaction.reply({ content: 'Only admins can use this', ephemeral: true });
				}

				if (data.Channel_Mute.includes(interaction.channel.id)) {
					let array = data.Channel_Mute.filter(x => x !== interaction.channel.id)
					data.Channel_Mute = array
					await data.save()

					return interaction.reply({ content: __("Channel has been unmuted", lang) });
				} else {
					data.Channel_Mute.push(interaction.channel.id)
					await data.save()
					return interaction.reply({ content: __("Channel has been muted", lang) });
				}
			}
		}
	},

	checkIfMuted: async (message) => {
		let data = await schema.findOne({ guildId: message.guild.id })
		if (data.User_Mute.includes(message.author.id) || data.Channel_Mute.includes(message.channel.id)) return false;
		return true;
	}
};