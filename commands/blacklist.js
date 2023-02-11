const { Constants } = require('discord.js');

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
		const { blacklist_db: db, __ } = require('../bot.js');
		const { options } = interaction;

		if (!interaction.member.permissions.has("ADMINISTRATOR")) {
			return interaction.reply({ content: __('onlyadmin', lang), ephemeral: true });
		} //Checks to see if you have admin perms

		let word = options.getString("word");
		const blacklist = db.get(`blacklist_${interaction.guild.id}`);

		switch (options.getSubcommand()) {
			case "add": {
				if (db.get(`blacklist_${interaction.guild.id}`) == null) db.set(`blacklist_${interaction.guild.id}`, []);
				if (blacklist.some(v => word.includes(v))) return interaction.reply({ content: __("alrinblacklist", lang), ephemeral: true });
				blacklist.push(word);
				db.set(`blacklist_${interaction.guild.id}`, blacklist);

				return interaction.reply({ content: __("blacklistadd", lang, { word: word }), ephemeral: true });
			}
			case "remove": {
				if (db.get(`blacklist_${interaction.guild.id}`) == null) db.set(`blacklist_${interaction.guild.id}`, []);
				if (!blacklist.some(v => word.includes(v))) return interaction.reply({ content: __("notinblacklist", lang), ephemeral: true });
				blacklist.splice(blacklist.indexOf(word), 1);
				db.set(`blacklist_${interaction.guild.id}`, blacklist);

				return interaction.reply({ content: __("blacklistremove", lang, { word: word }), ephemeral: true });
			}
			case "list": {
				if (db.get(`blacklist_${interaction.guild.id}`) == null) db.set(`blacklist_${interaction.guild.id}`, []);
				const list = blacklist.join('\n') || "empty";

				return interaction.reply({ content: __("currentblacklist", lang, { list: list }), ephemeral: true });
			}
		}
	},

	checkIfIgnored: (message) => {
		const { blacklist_db: db } = require('../bot.js');
		
		if (db.get(`blacklist_${message.guild.id}`) == null) db.set(`blacklist_${message.guild.id}`, []);
		let blacklist = db.get(`blacklist_${message.guild.id}`);
		if (blacklist.some(v => message.content.includes(v))) return true;
		return false;
	}
};