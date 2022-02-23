module.exports = {
	command: {
		name: "dmmute",
		description: "Mutes DMs for you",
		options: []
	},

	//Timeout
	default: async (interaction, lang) => {
		const { user_mutes_db: db } = require('../index');
		const {
			dmmute2, 
			dmmute3
		} = require(`../lang/${lang}.json`);

		if (db.get(`dmmute_${interaction.user.id}`)) {
			db.delete(`dmmute_${interaction.user.id}`);
			interaction.reply({ content: dmmute2, ephemeral: true });
		} else {
			db.set(`dmmute_${interaction.user.id}`, true);
			interaction.reply({ content: dmmute3, ephemeral: true });
		}
	}
};