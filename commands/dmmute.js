module.exports = {
	command: {
		name: "dmmute",
		description: "Mutes DMs for you",
		options: []
	},

	//Timeout
	default: async (interaction, lang) => {
		const {db} = require('../index');
		const {
			dmmute2, 
			dmmute3
		} = require(`../lang/${lang}.json`);

		if (db.get(`dmmute_${interaction.user.id}`)) {
			db.delete(`dmmute_${interaction.user.id}`);
			interaction.reply(dmmute2);
		} else {
			db.set(`dmmute_${interaction.user.id}`, true);
			interaction.reply(dmmute3);
		}
	}
}