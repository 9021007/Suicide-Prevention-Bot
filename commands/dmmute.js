const schema = require('../scripts/database.js')

module.exports = {
	command: {
		name: "dmmute",
		description: "Mutes DMs for you",
		options: []
	},

	default: async (interaction, lang) => {
		const { __ } = require('../index');
		let data = await schema.findOne({ guildId: interaction.guild.id })

		if (data.DM_Mute.includes(interaction.user.id)) {
			let array = data.DM_Mute.filter(x => x !== interaction.user.id)
			data.DM_Mute = array
			await data.save()
			return interaction.reply({ content: __("Removed from DM ignore list.", lang), ephemeral: true });
		} else {
			data.DM_Mute.push(interaction.user.id)
			await data.save()
			return interaction.reply({ content: __("I will stop allowing others to send DMs to you via this bot. type /dmmute again to undo.", lang), ephemeral: true });
		}
	}
};