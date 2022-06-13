const { MessageEmbed } = require('discord.js');

module.exports = {
     command: {
		name: "help",
		description: "Displays a help page",
		options: []
	},
     
     default: async (interaction, lang) => {
		const { __ } = require("../index.js");

		const help = new MessageEmbed()
			.setColor('#04d384')
			.setAuthor({
				name: __("Suicide Prevention Bot Info", lang),
				iconURL: 'https://spbot.ml/siround.png'
			})
			.setTitle(__("You requested help?", lang))
			.setURL('https://spbot.ml')
			.addField(__("Commands - prefix is / [command here]", lang), "help\n bot (alias: neofetch, v)\n info\n invite\n mute\n ping\n dm (user)\n dmmute\n set\n lang\n")
			.addField(__("Links", lang), __("[Website](https://spbot.ml/)\n [Discord Invite](https://discord.com/invite/YHvfUqVgWS)\n [GitHub](https://github.com/Bobrobot1/Suicide-Prevention-Bot)\n [Status Page](https://spbot.freshstatus.io/)\n", lang))
			.addField(__("Need more help? Found a bug?", lang), __("[Join the discord!](https://discord.com/invite/YHvfUqVgWS)", lang));
		interaction.reply({ embeds: [help] });
}
};