const { Constants } = require('discord.js');

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
		const { channel_mutes_db: db, __ } = require('../bot.js');

		switch (options.getSubcommand()) {
			case "user": {
				const { user_mutes_db: db } = require('../bot.js');

				if (db.get(`mute_${interaction.user.id}`)) {
					db.delete(`mute_${interaction.user.id}`);
					interaction.reply({ content: __("rmignorelist", lang), ephemeral: true });
				} else {
					db.set(`mute_${interaction.user.id}`, true);
					interaction.reply({ content: __("addignorelist", lang), ephemeral: true });
				}
				break;
			}
			case "channel": {
				if (!interaction.member.permissions.has("MANAGE_SERVER")) {
					return interaction.reply({ content: 'Only admins can use this', ephemeral: true });
				}
				const { channel_mutes_db: db } = require('../bot.js');
				
				if (db.get(`mute_${interaction.channel.id}`)) {
					db.delete(`mute_${interaction.channel.id}`);
					return interaction.reply({ content: __("chanunmute", lang) });
				} else {
					db.set(`mute_${interaction.channel.id}`, true);
					return interaction.reply({ content: __("chanmute", lang) });
				}
			}
		}
	},

	checkIfMuted: (message) => {
		const { user_mutes_db, channel_mutes_db } = require('../bot.js');
		return user_mutes_db.get(`mute_${message.author.id}`) != null || channel_mutes_db.get(`mute_${message.channel.id}`) != null;
	}
};