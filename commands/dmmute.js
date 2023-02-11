module.exports = {
	command: {
		name: "dmmute",
		description: "Mutes DMs for you",
		options: []
	},

	default: async (interaction, lang) => {
		const { user_mutes_db: db, __ } = require('../bot.js');
		
		if (db.get(`dmmute_${interaction.user.id}`)) {
			db.delete(`dmmute_${interaction.user.id}`);
			interaction.reply({ content: __("dmignoreremove", lang), ephemeral: true });
		} else {
			db.set(`dmmute_${interaction.user.id}`, true);
			interaction.reply({ content: __("dmignoreadd", lang), ephemeral: true });
		}
	}
};