const { Constants, MessageEmbed } = require('discord.js');

module.exports = {
	command: {
		name: "hug",
		description: "Sends a hug to your favorite user",
		options: [
			{
				name: "user",
				description: "The user to hug",
				type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
			}
		]
	},

	default: async (interaction, lang) => {
		// to add
	}
};