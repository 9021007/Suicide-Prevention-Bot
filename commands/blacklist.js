const { Constants } = require('discord.js');
const Database = require('simplest.db');
const fs = require("fs");

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
		const { commandName, options } = interaction;
		if (!interaction.member.permissions.has("ADMINISTRATOR")) {
			return interaction.reply({ content: 'Only admins can use this', ephemeral: true });
		}

		const { blacklist_db: db } = require('../index');

		switch (options.getSubcommand()) {
			case "add": {
				if (db.get(`blacklist_${interaction.guild.id}`) == null) db.set(`blacklist_${interaction.guild.id}`, []);
				let blacklist = db.get(`blacklist_${interaction.guild.id}`);
				let word = options.getString("word");
				if (blacklist.some(v => word.includes(v))) return interaction.reply({ content: "This word is already in the blacklist", ephemeral: true });
				blacklist.push(word);
				db.set(`blacklist_${interaction.guild.id}`, blacklist);

				return interaction.reply({ content: `Word \`${word}\` has been added to the blacklist`, ephemeral: true });
			}
			case "remove": {
				if (db.get(`blacklist_${interaction.guild.id}`) == null) db.set(`blacklist_${interaction.guild.id}`, []);
				let blacklist = db.get(`blacklist_${interaction.guild.id}`);
				let word = options.getString("word");
				if (!blacklist.some(v => word.includes(v))) return interaction.reply({ content: "This word is not in the blacklist", ephemeral: true });
				blacklist.splice(blacklist.indexOf(word), 1);
				db.set(`blacklist_${interaction.guild.id}`, blacklist);

				return interaction.reply({ content: `Word \`${word}\` has been removed from the blacklist`, ephemeral: true });
			}
			case "list": {
				if (db.get(`blacklist_${interaction.guild.id}`) == null) db.set(`blacklist_${interaction.guild.id}`, []);
				const data = db.get(`blacklist_${interaction.guild.id}`);
				const list = data.join(', ') || "empty";

				return interaction.reply({ content: `The current blacklist is: \`${list}\``, ephemeral: true });
			}
		}
	},

	checkIfIgnored: (message) => {
		const { blacklist_db: db } = require('../index');
		
		if (db.get(`blacklist_${message.guild.id}`) == null) db.set(`blacklist_${message.guild.id}`, []);
		let blacklist = db.get(`blacklist_${message.guild.id}`);
		if (blacklist.some(v => message.content.includes(v))) return true;
		return false;
	}
};