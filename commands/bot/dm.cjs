const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const { __ } = require('../../bot.cjs');
const { EmbedBuilder } = require('discord.js');
const { themecolor, website, supportedLanguages} = require('../../config.json')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('dm')
		.setDescription('Send a private DM to a user, with information on how to get help.')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('Which user do you want to send the DM to?')
            .setRequired(true)
            ),
	async execute(interaction, lang) {
        import('../../database.mjs').then((db) => {
            const alert = require("../../events/alert.cjs")
            const user = interaction.options.getUser('user'); // get the user from the command
            if (user) { // if the user exists
                check = db.checkDmMutedUser(user.id).then((check) => { // check if the user has opted out of DMs
                    if (check == false) { // if the user has not opted out of DMs
                        lastdmtime = db.checkLastDmTime(user.id).then((lastdmtime) => { // check when the last DM was sent to the user
                            if (Date.now() - lastdmtime < 86400000) { // if the last DM was sent within 24 hours
                                interaction.reply(__("A DM has already been sent to this user within the last 24 hours. Please wait before sending another DM.", lang));
                                return;
                            } else { // if the last DM was sent more than 24 hours ago
                                const newembed = alert.embed
                                const dmoptout = new ButtonBuilder()
                                    .setCustomId('dmoptout')
                                    .setLabel('Opt out of all user-directed bot DMs')
                                    .setStyle(ButtonStyle.Secondary);

                                const row = new ActionRowBuilder()
                                    .addComponents(dmoptout);
                                // try to DM user
                                try {
                                    if (user.bot == true) {
                                        interaction.reply(__("You cannot send a DM to a bot.", lang));
                                        return;
                                    } else {
                                        user.send({ embeds: [newembed], components: [row] });
                                        interaction.reply(__("DM sent!", lang));
                                    }
                                }
                                catch (error) {
                                    console.error('Could not send DM to user', error);
                                    interaction.reply(__("Could not send DM to user. The user may not have DMs enabled.", lang));
                                    return;
                                }
                                db.setLastDmTime(user.id, Date.now());
                            }
                        });
                    } else {
                        interaction.reply(__("This user has opted out of user-directed bot DMs. You cannot send a DM to this user.", lang));
                        return;
                    }
                })
            }

        });
	},
};
