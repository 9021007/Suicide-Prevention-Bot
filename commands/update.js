const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = (message, lang) => {
    const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setLabel('Add Slash Commands')
				.setStyle('LINK')
				.setURL(`https://discord.com/api/oauth2/authorize?client_id=${message.client.application.id}&permissions=92160&scope=bot%20applications.commands&guild_id=${message.guild.id}`),
			new MessageButton()
				.setLabel('Support Server')
				.setStyle('LINK')
				.setURL("https://discord.com/invite/YHvfUqVgWS"),
		);

    return message.channel.send(
		{
			content: "Commands have been moved to slash commands! Type `/` to see a list of commands. If you don't see them, ask a server admin to click the button below to add my slash commands.",
			components: [row]
		}
	);
}