module.exports = {
     command: {
		name: "mute",
		description: "Prevent the bot from responding to your messages",
		options: []
	},

     default: async (interaction, lang) => {
		
	 }
};

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
		const { commandName, options } = interaction;
		const { channel_mutes_db: db } = require('../index');

		switch (options.getSubcommand()) {
			case "user": {
				const { user_mutes_db: db } = require('../index');
				const { mute2, mute3 } = require(`../lang/${lang}.json`);

				if (db.get(`mute_${interaction.user.id}`)) {
					db.delete(`mute_${interaction.user.id}`);
					interaction.reply({ content: mute2, ephemeral: true });
				} else {
					db.set(`mute_${interaction.user.id}`, true);
					interaction.reply({ content: mute3, ephemeral: true });
				}
			}
			case "channel": {
				if (!interaction.member.permissions.has("ADMINISTRATOR")) {
					return interaction.reply({ content: 'Only admins can use this', ephemeral: true });
				}
				const { channel_mutes_db: db } = require('../index');
				

				if (db.get(`mute_${interaction.channel.id}`)) {
					db.delete(`mute_${interaction.channel.id}`);
					interaction.reply({ content: "Channel has been unmuted" });
				} else {
					db.set(`mute_${interaction.channel.id}`, true);
					interaction.reply({ content: "Channel has been muted" });
				}
			}
		}
	},

	checkIfMuted: (message) => {
		const { user_mutes_db, channel_mutes_db } = require('../index');
		return user_mutes_db.get(`mute_${message.author.id}`) != null || channel_mutes_db.get(`mute_${message.channel.id}`) != null
	}
};