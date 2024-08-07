const { EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const { __ } = require('../bot.cjs');
const { website, themecolor, detectionPort, detectionEndpoint } = require("../config.json")
const { returnEmbed } = require("./alert.cjs")
const axios = require('axios');

module.exports = {
	async execute(message, lang) {
        import('../database.mjs').then(async (db) => {
            // If user has muted bot, skip
            if (await db.checkMutedUser(message.author.id)) {
                return;
            }

            var messagecontent = message.content
            var codeblocks = message.content.match(/```[\s\S]*?```|`[^`]+`/g);

            // Removes codeblocks from message
            if (codeblocks) {
                for (var i = 0; i < codeblocks.length; i++) {
                    messagecontent = messagecontent.replace(codeblocks[i], "");
                }
            }

            // Removes duplicate words from message
            messagecontent = messagecontent.split(" ");
            var processedcontent = []
            for (var i = 0; i < messagecontent.length; i++) {
                if (messagecontent[i] != messagecontent[i + 1]) {
                    processedcontent.push(messagecontent[i]);
                }
            }
            processedcontent = processedcontent.join(" ");
            

            axios.post(`http://${detectionEndpoint}:${detectionPort}`, processedcontent).then(function (response) {
                if (response.data > 0.5 && response.data < 0.95){
                    try {
                        const newembed = returnEmbed(lang);
                        newembed.setFooter({text: __("This message was displayed because the bot believes this message is about suicide", lang), iconURL: website + '/img/siround.png'})
                        const optout = new ButtonBuilder()
                            .setCustomId('optout')
                            .setLabel(__('Opt out of these replies',lang))
                            .setStyle(ButtonStyle.Secondary);
                        const reportissue = new ButtonBuilder()
                            .setCustomId(`reportissue-${message.guildId}-${message.id}`)
                            .setLabel(__('Report Issue',lang))
                            .setStyle(ButtonStyle.Secondary);
                        const row = new ActionRowBuilder()
                            .addComponents(optout)
                            .addComponents(reportissue);
                            
                        message.reply({ embeds: [newembed], components: [row] });
                    }
                    catch(e) {
                        console.log(e);
                    }
                }
              })
              .catch(function (error) {
                console.log(error);
              });
        });
	},
};