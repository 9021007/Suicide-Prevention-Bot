const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { __ } = require('../bot.cjs');
const { website, themecolor, lines } = require("../config.json")
var lineobj = [];

for (var i = 0; i < lines.length; i++) {
    lineobj.push({ name: lines[i][0], value: lines[i][1], inline: true });
}

var embed = new EmbedBuilder()
    .setColor(themecolor)
    .setTitle(__("Help is available, 24 hours a day.", lang))
    .setDescription(__("Suicide and self harm are preventable. If you feel that you are considering suicide or self harm, please reach out for help. Resources are availble 24/7.", lang))
    .setAuthor({
        name: __("Speak with a trained mental health counselor", lang),
        iconURL: website + '/img/siround.png'
    })
    .addFields(...lineobj)
    .addFields(
        {name: __("Other countries?", lang), value: `[${__("Click here", lang)}](${website}/lifelines)`, inline: true},
        {name: __("Need extra support?", lang), value: __("Text **DISCORD** to **741741** from anywhere in the United States to chat with a trained volunteer crisis counselor at Crisis Text Line. Counselors are available 24/7 to help you or a friend through any mental health crisis.", lang), inline: false}
    )


exports.embed = embed;