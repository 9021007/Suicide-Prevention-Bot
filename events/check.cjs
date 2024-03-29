const { EmbedBuilder } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');
const { __ } = require('../bot.cjs');
const { website, themecolor, detectionPort, detectionEndpoint } = require("../config.json")
const { returnEmbed } = require("./alert.cjs")
const axios = require('axios');

module.exports = {
	async execute(message, lang) {
        import('../database.mjs').then(async (db) => {
            if (await db.checkMutedUser(message.author.id)) {
                return;
            }
            

            const newembed = returnEmbed(lang);
            newembed.setFooter({text: __("This message was displayed because the bot believes this message is about suicide", lang), iconURL: website + '/img/siround.png'})

            const optout = new ButtonBuilder()
                .setCustomId('optout')
                .setLabel('Opt out of these replies')
                .setStyle(ButtonStyle.Secondary);

            const row = new ActionRowBuilder()
                .addComponents(optout);

            axios.post(`http://${detectionEndpoint}:${detectionPort}`, message.content).then(function (response) {
                if (response.data > 0.5 && response.data < 0.95){
                    try {
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