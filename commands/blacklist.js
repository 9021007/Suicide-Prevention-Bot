const { Constants } = require('discord.js');
const schema = require('../scripts/database.js')

module.exports = {
	command: {
		name: "blacklist",
		description: "Blacklist settings",
		options: [
			{
				name: "add",
				description: "Add a word to ignore",
				type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
				options: [
					{
						name: "word",
						description: "Word to ignore",
						required: true,
						type: Constants.ApplicationCommandOptionTypes.STRING
					}
				]
			},
			{
				name: "remove",
				description: "Remove a word to ignore",
				type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
				options: [
					{
						name: "word",
						description: "Word to ignore",
						required: true,
						type: Constants.ApplicationCommandOptionTypes.STRING
					}
				]
			},
			{
				name: "list",
				description: "See what words are a nono",
				type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
				options: []
			}
		]
	},

	default: async (interaction, lang) => {
		const { __ } = require('../index');
		const { options } = interaction;

		if (!interaction.member.permissions.has("ADMINISTRATOR")) {
			return interaction.reply({ content: __('Only admins can use this', lang), ephemeral: true });
		} //Checks to see if you have admin perms

		const word = options.getString("word");
		let data = await schema.findOne({ guildId: interaction.guild.id })

		switch (options.getSubcommand()) {
			case "add": {
				if (data.BLW.includes(word)) return interaction.reply({ content: __("This word is already in the blacklist", lang), ephemeral: true });
				data.BLW.push(word)
				await data.save()

				return interaction.reply({ content: __("Word `{{word}}` has been added to the blacklist", lang, { word: word }), ephemeral: true });
			}
			case "remove": {
				if (!data.BLW.includes(word)) return interaction.reply({ content: __("This word is not in the blacklist", lang), ephemeral: true });
				let array = data.BLW.filter(x => x !== word)
				data.BLW = array
				await data.save()

				return interaction.reply({ content: __("Word `{{word}}` has been removed from the blacklist", lang, { word: word }), ephemeral: true });
			}
			case "list": {
				const list = data.BLW.join('\n') || "empty"

				return interaction.reply({ content: __("The current blacklist consists of the words:\n```\n{{list}}```", lang, { list: list }), ephemeral: true });
			}
		}
	},

	checkIfIgnored: async (message) => {
		let data = await schema.findOne({ guildId: message.guild.id })
		if (data.BLW.some(v => message.content.includes(v))) return false;
		return true;
	}
};