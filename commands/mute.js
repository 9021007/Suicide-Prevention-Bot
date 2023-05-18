module.exports = {
	command: {
		name: "mute",
		description: "Toggle automatic message replies",
		options: [
			{
				name: "user",
				description: "Toggle prevents the bot from reacting to messages from you",
				type: 1,
				options: []
			},
			{
				name: "channel",
				description: "Toggle muting the bot in a channel",
				type: 1,
				options: [
					{
						name: "channel",
						description: "Channel to mute/unmute",
						required: true,
						type: 7
					}
				]
			},
		]
	},

	default: async (interaction, lang, db) => {
		const { options } = interaction;

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

	checkIfMuted: async (message, db) => {
		return (await db.execute('SELECT * FROM `user_mutes` WHERE `user_id` = ?', [message.author.id]))[0].length > 0 || (await db.execute('SELECT * FROM `channel_mutes` WHERE `channel_id` = ?', [message.channel.id]))[0].length > 0;
	}
};