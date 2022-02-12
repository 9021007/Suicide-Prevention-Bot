module.exports = {
     command: {
		name: "mute",
		description: "Prevent the bot from responding to your messages",
		options: []
	},

     default: async (interaction, lang) => {
		const { db } = require('../index');
		const { mute2, mute3 } = require(`../lang/${lang}.json`);

		if (db.get(`mute_${interaction.user.id}`)) {
			db.delete(`mute_${interaction.user.id}`);
			interaction.reply({ content: mute2, ephemeral: true });
		} else {
			db.set(`mute_${interaction.user.id}`, true);
			interaction.reply({ content: mute3, ephemeral: true });
		}
	 }
};