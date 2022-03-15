module.exports = {
	command: {
		name: "dmmute",
		description: "Mutes DMs for you",
		options: []
	},

	//Timeout
	default: async (interaction, lang) => {
		const { user_mutes_db: db, __ } = require('../index');
		const {
			dmmute2, 
			dmmute3
		} = require(`../lang/${lang}.json`);
		
		if (db.get(`dmmute_${interaction.user.id}`)) {
			db.delete(`dmmute_${interaction.user.id}`);
			interaction.reply({ content: __("Removed from DM ignore list.", lang), ephemeral: true });
		} else {
			db.set(`dmmute_${interaction.user.id}`, true);
			interaction.reply({ content: __("I will stop allowing others to send DMs to you via this bot. type /dmmute again to undo.", lang), ephemeral: true });
		}
	}
};