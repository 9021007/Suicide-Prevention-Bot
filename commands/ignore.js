const { Constants } = require('discord.js');
const Database = require('simplest.db');

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
		switch (options.getSubcommand()) {
			case "add": {
				const db = new Database({
					path: './database/blacklist.json'
				});
				let blacklist = db.get(`blacklist_${interaction.guild.id}`);
				let word = options.getString("word");
				if (blacklist.some(v => word.includes(v))) return interaction.reply({ content: "This word is already in the blacklist" });
				blacklist.push(word);
				db.set(`blacklist_${interaction.guild.id}`, blacklist);
		
				return interaction.reply({ content: `Word \`${word}\` has been added to the blacklist` });
			}
			case "remove": {
				const db = new Database({
					path: './database/blacklist.json'
				});
				let blacklist = db.get(`blacklist_${interaction.guild.id}`);
				let word = options.getString("word");
				if (!blacklist.some(v => word.includes(v))) return interaction.reply({ content: "This word is not in the blacklist" });
				blacklist.splice(blacklist.indexOf(word), 1)
				db.set(`blacklist_${interaction.guild.id}`, blacklist);
		
				return interaction.reply({ content: `Word \`${word}\` has been removed from the blacklist` });
			}
			case "list": {
				const db = new Database({
					path: './database/blacklist.json'
				});
			}
		} 
	},

	checkIfIgnored: (message) => {
		const db = new Database({
			path: './database/blacklist.json'
		});
		let blacklist = db.get(`blacklist_${message.guild.id}`);
		if (blacklist.some(v => message.content.includes(v))) return true;
		return false;
	}
};