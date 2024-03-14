const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { __ } = require('../../bot.cjs');
const { website, themecolor } = require("../../config.json")
const path = require('node:path');
const fs = require('node:fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Displays all available commands'),
	async execute(interaction, lang) {




        const commands = [];
        // Grab all the command folders from the commands directory you created earlier
        const foldersPath = path.join(__dirname, '../../commands');
        const commandFolders = fs.readdirSync(foldersPath);

        for (const folder of commandFolders) {
            // Grab all the command files from the commands directory you created earlier
            const commandsPath = path.join(foldersPath, folder);
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.cjs'));
            // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);
                if ('data' in command && 'execute' in command) {
                    commands.push({name: "/" + command.data.toJSON()["name"], value: command.data.toJSON()["description"]});
                } else {
                    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                }
            }
        }
        const embed = new EmbedBuilder()
            .setTitle(__("Suicide Prevention Bot Command List", lang))
            .setDescription(__("Here are all available commands:", lang))
            .setColor(themecolor)
            .addFields(...commands)
            .setURL(website)
            .setThumbnail(website + "/img/siround.png")


		await interaction.reply({ embeds: [embed] });
	},
};