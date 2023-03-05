const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = (message, lang) => {
	const { __ } = require('../bot.js');
    const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setLabel(__('slashadd', lang))
				.setStyle('LINK')
				.setURL(`https://discord.com/api/oauth2/authorize?client_id=${message.client.application.id}&permissions=92160&scope=bot%20applications.commands&guild_id=${message.guild.id}`),
			new MessageButton()
				.setLabel(__('supportserver', lang))
				.setStyle('LINK')
				.setURL("https://discord.com/invite/YHvfUqVgWS"),
		);

    return message.channel.send(
		{
			content: __("slashf1", lang),
			components: [row]
		}
	);
}