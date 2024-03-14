const { Client, Events, Collection, GatewayIntentBits, PermissionsBitField } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const type = require('node:os');
const dotenv = require('dotenv');
dotenv.config();
const token = process.env.BOT_TOKEN;
const { supportedLanguages, defaultLanguage } = require('./config.json');


import('./database.mjs').then((db) => {

    // test import
    if (db.check() == "pass") {
        console.log("Database library loaded.");
    } else {
        console.log("Database library failed to load.");
    }

    // internationalization
    const languageChoices = () => {
        var languages = [];
        for (var l of supportedLanguages) {
            languages.push(l[0]);
        }
        return languages;
    };

    const { I18n } = require('i18n');
    const i18n = new I18n({
        locales: languageChoices(),
        directory: "./locales",
        syncFiles: true
    });

    const __ = (string, lang, options = undefined) => {
        return i18n.__({ phrase: string, locale: lang }, options);
    };

    exports.__ = __;

    // test i18n by checking for translation of "i18n pass" in en.json
    console.log(__("i18n pass", "en"));

    // declare intents
    const client = new Client({ intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ] });


    // command directory
    client.commands = new Collection();

    const foldersPath = path.join(__dirname, 'commands');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.cjs'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }

    client.once(Events.ClientReady, readyClient => {
        console.log(`Ready! Logged in as ${readyClient.user.tag}`);

        // once per minute
        function updateStatus() {
            // user count
            try {client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)).then(results => {
                client.user.setActivity(`Protecting ${results.reduce((acc, memberCount) => acc + memberCount, 0)} users`, { type: 4 });
            });}
            catch(e) {
                console.log(e);
            }
            
        }
        updateStatus();
        setInterval(updateStatus, 60000);
    });

    // command handling
    client.on(Events.InteractionCreate, async interaction => {
        lang = defaultLanguage

        if (interaction.guildId === null) { //if it's a dm
            dblang = defaultLanguage;
        } else {
            var dblang = await db.checkServerLang(interaction.guildId);
        }

        if (dblang === "") { //if the server isn't in the database
            await db.setServerLang(interaction.guildId, defaultLanguage);
        } else {
            lang = dblang;
        }


        if (interaction.isChatInputCommand()) {

            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.execute(interaction, lang);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
            }
        } else if (interaction.isButton()) {
            if (interaction.customId == "optout") {
                await db.setMutedUser(interaction.user.id, true);
                await interaction.reply({ content: __("You have opted out of these replies. To opt back in, use the `/optin` command", lang), ephemeral: true });
            } else if (interaction.customId == "dmoptout") {
                await db.setDmMutedUser(interaction.user.id, true);
                await interaction.reply({ content: __("You have opted out of user-directed bot DMs. To opt back in, use `/dmunmute`.", lang), ephemeral: true });
            }
        } else {
            console.log(`Unhandled interaction type: ${interaction.type}`);
            return;
        }

        
    });

    client.on(Events.MessageCreate, async message => {
        if (message.author.bot || message.channel.type === 'DM' || !message.channel.permissionsFor(client.user).has(PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.ReadMessageHistory)) return; // Verify permissions of user who sent message before continuing.
    
        lang = defaultLanguage
        var dblang = await db.checkServerLang(message.guildId);

        if (dblang === "") { //if the server isn't in the database
            await db.setServerLang(message.guildId, defaultLanguage);
        } else {
            lang = dblang;
        }

        let LCM = message.content.toLowerCase(); //Lower case message text

        if (message.mentions.users.first() === client.user && message.reference == null) {
            return require('./events/mention.cjs').execute(message, lang);
        } else {
            return require('./events/check.cjs').execute(message, lang);
        }

        
        


    });


    client.login(token);
    exports.client = client;


});
