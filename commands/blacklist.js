module.exports = {
	command: {
		name: "blacklist",
		description: "Blacklist settings",
		options: [
			{
				name: 'input',
				description: 'Options for the blacklist feature',
				type: 3,
				required: true,
				choices: [
					{
						name: 'list',
						value: 'list',
					},
					{
						name: 'add',
						value: 'add',
					},
					{
						name: 'remove',
						value: 'remove',
					},
				],
			},
			{
				name: 'word',
				description: 'the chosen word to add or remove',
				type: 3,
				required: false,
			},
		]
	},

	default: async (interaction, lang) => {
		const { blacklist_db: db, __ } = require('../bot.js');

		if (!interaction.member.permissions.has("ADMINISTRATOR")) {
			return interaction.reply({ content: __('onlyadmin', lang), ephemeral: true });
		} //Checks to see if you have admin perms

		const input = interaction.options.getString('input')
		const word = interaction.options.getString('word')
		const blacklist = db.get(`blacklist_${interaction.guild.id}`);

		if (input === 'list') {
			if (db.get(`blacklist_${interaction.guild.id}`) == null) db.set(`blacklist_${interaction.guild.id}`, []);
			const list = blacklist.join('\n') || "empty";

			return interaction.reply({ content: __("currentblacklist", lang, { list: list }), ephemeral: true });
		}
		if (input === 'add') {
			if (!word) {
				return interaction.reply({ content: __("errorblacklist", lang), ephemeral: true })
			}
			if (db.get(`blacklist_${interaction.guild.id}`) == null) db.set(`blacklist_${interaction.guild.id}`, []);
			if (blacklist.some(v => word.includes(v))) return interaction.reply({ content: __("alrinblacklist", lang), ephemeral: true });
			blacklist.push(word);
			db.set(`blacklist_${interaction.guild.id}`, blacklist);

			return interaction.reply({ content: __("blacklistadd", lang, { word: word }), ephemeral: true });
		}
		if (input === 'remove') {
			if (!word) {
				return interaction.reply({ content: __("errorblacklist", lang), ephemeral: true })
			}
			if (db.get(`blacklist_${interaction.guild.id}`) == null) db.set(`blacklist_${interaction.guild.id}`, []);
			if (!blacklist.some(v => word.includes(v))) return interaction.reply({ content: __("notinblacklist", lang), ephemeral: true });
			blacklist.splice(blacklist.indexOf(word), 1);
			db.set(`blacklist_${interaction.guild.id}`, blacklist);

			return interaction.reply({ content: __("blacklistremove", lang, { word: word }), ephemeral: true });
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