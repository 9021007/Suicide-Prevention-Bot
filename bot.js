/*
HEY! IF you're reading this, you clearly know how to code. Come help us! Join our discord: https://discord.gg/YHvfUqVgWS

MMMMMMMMMMMMMMMMMWNKK000KXNWMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMWKxo:;,''''',:ldONWMMMMMMMMMMMMM
MMMMMMMMMMMXkc'.            ..;o0WMMMMMMMMMMM
MMMMMMMMMNk;.                  ..lKWMMMMMMMMM
MMMMMMMMXo.      ...........     .,kWMMMMMMMM
MMMMMMMXl.   ..;lxO0KKKKK0Oxl;..   'xWMMMMMMM
MMMMMMWd.   .c0NMMMMMMMMMMMMMNx.    ,OWMMMMMM
MMMMMMK;    .lXMMMMMMMMMMMMMMXl.    .cXMMMMMM
MMMMMMk.     .oNMMMMMMMMMMMMNo.      ,0MMMMMM
MMMMMWx.      .dNMMMMMMMMMMNo.       ,0MMMMMM
MMMMMM0;       .oXMMMMMMMMXl.       .cXMMMMMM
MMMMMMWd.       .:0WMMMMWO;.        'kWMMMMMM
MMMMMMMXo.       .'dXMMNx'.        .oNMMMMMMM
MMMMMMMMXo.        .;dxc.         .oXMMMMMMMM
MMMMMMMMMNd.         ...        .'dNMMMMMMMMM
MMMMMMMMMMWk,.        .        .,kWMMMMMMMMMM
MMMMMMMMMMMW0c.               .:0WMMMMMMMMMMM
MMMMMMMMMMMMMXd'.            .oXMMMMMMMMMMMMM
MMMMMMMMMMMMMMWk'.           .dNMMMMMMMMMMMMM
MMMMMMMMMMMMMMNd.             .lXMMMMMMMMMMMM
MMMMMMMMMMMMMNd.               .:0WMMMMMMMMMM
MMMMMMMMMMMMNo.                 .,kWMMMMMMMMM
MMMMMMMMMMMNo.                   .'dNMMMMMMMM
MMMMMMMMMMNo.        ...'.         .oNMMMMMMM
MMMMMMMMMNo.         'ckKo.         .oNMMMMMM
MMMMMMMMWx.        .'kNWMNd'.        .oNMMMMM
MMMMMMMMK;         'kWMMMMWk,.       .lXMMMMM
MMMMMMMMNx,.      'kWMMMMMMW0;.     .oXMMMMMM
MMMMMMMMMWKc.   .'kWMMMMMMMMMKc.  .'xNMMMMMMM
MMMMMMMMMMMNk,..'kWMMMMMMMMMMMXo..:0WMMMMMMMM
MMMMMMMMMMMMWKl;kWMMMMMMMMMMMMMNkdXMMMMMMMMMM
MMMMMMMMMMMMMMNXWMMMMMMMMMMMMMMMMWMMMMMMMMMMM
*/


/**
 * Initialization
 * Error handling
 */
process
	.on('unhandledRejection', (reason, p) => {
		console.error(reason, 'Unhandled Rejection at Promise', p);
	})
	.on('uncaughtException', err => {
		console.error(err, 'Uncaught Exception caught');
	});

const { Client, Intents, Constants } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.DIRECT_MESSAGES], partials: ["CHANNEL"] });
const { token, botPerms, devGuildId, clearCommandList } = require('./config.json');

var { activityResetTimeout_SECONDS } = require('./config.json');
activityResetTimeout_SECONDS *= 1000;

const Database = require('simplest.db').JS0N;
const gradient = require('gradient-string');

// Initialize databases
const user_mutes_db = new Database({
  path: './database/user_mutes.json'
});
const blacklist_db = new Database({
	path: './database/blacklist.json'
});
const triggers_db = new Database({
	path: './database/triggers.json'
});
const channel_mutes_db = new Database({
	path: './database/channel_mutes.json'
});
const lang_db = new Database({
	path: './database/lang.json'
});

const languageChoices = () => {
	const { supportedLanguages } = require('./config.json');
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


// Setup bot ready callback
client.once('ready', async () => {
	if(!clearCommandList == true){
		console.log(gradient.rainbow(`[+] Logged in as ${client.user.tag}! ＼(￣▽￣)／`)); // Console log for verbosity
	}
	client.user.setActivity(
		"chat for suicide.", {
		type: 'LISTENING'
	});
	// Auto imports every file in commands/ as a slash command
	// Crashes if it finds an invalid command file
	let commands = [];
	var normalizedPath = require("path").join(__dirname, "commands");

	require("fs").readdirSync(normalizedPath).forEach(function (file) {
		commands.push(require("./commands/" + file).command);
	});

	// Get dev guild ID for slash commands, comment to use global slash commands
	const devGuild = client.guilds.cache.get(devGuildId);
	if (typeof devGuild == "undefined") {
		if(clearCommandList == true) {
			await client.application.commands.set([]);
			await devGuild.commands.set([]);
			console.log(gradient.rainbow("[+] Cleared commands (helps remove old commands or duplicates)"));
			console.log("\x1B[31mPlease set \"clearCommandList\" in config.json to false to run the bot normally!\x1b[37m");
		} else {
			await client.application.commands.set(commands);
			console.log(gradient.rainbow("[+] Set global commands"));
		}
	} else {
		if(clearCommandList == true) {
			await client.application.commands.set([]);
			await devGuild.commands.set([]);
			console.log(gradient.rainbow("[+] Cleared commands (helps remove old commands or duplicates)"));
			console.log("\x1B[31mPlease set \"clearCommandList\" in config.json to false to run the bot normally!\x1b[37m");
		} else {
			await devGuild.commands.set(commands);
			console.log(gradient.rainbow("[+] Set guild/local commands"));
		}
	}
});

/**
* Commands
*/
client.on('messageCreate', async message => {
	lastMessage = message;
	
	if (message.author.bot || message.channel.type === 'DM' || !message.channel.permissionsFor(client.user).has(botPerms)) return; // Verify permissions of user who sent message before continuing.

	let lang = "en";
	const server_language = lang_db.get(`lang_${message.guild.id}`);
	if (typeof server_language === 'string') lang = server_language;

	let LCM = message.content.toLowerCase(); //Lower case message text

	// Mention bot will activate alert message without triggers
	if (message.mentions.users.first() === client.user)
	return require('./events/bot-mentioned')(message, lang, LCM);

	//Check to see if you muted the bot (User side only)
	if (!require("./commands/mute").checkIfMuted(message) && !require("./commands/blacklist.js").checkIfIgnored(message)) 
		require('./events/every-unmuted-message')(message, lang, LCM);

	// Ask to add slash commands if the old prefix is used
	if (LCM.startsWith("sp!")) {
		require("./events/update")(message, lang, LCM);
	}
});


/**
 * Slash Commands
 */
client.on("interactionCreate", async (interaction) => {
	//Slash Commands
	if (interaction.isCommand()) {
		var lang = "en";
		const server_language = lang_db.get(`lang_${interaction.guild.id}`);
		if (typeof server_language === 'string') lang = server_language;

		const { commandName, options } = interaction;
		return require(`./commands/${commandName}`).default(interaction, lang);
	}

	//Buttons
	if (interaction.isButton()) {
		if (interaction.customId.includes('button2')) {
				user_mutes_db.set(`dmmute_${interaction.user.id}`, true);
				await interaction.reply({ content: "👍" });
		}
	}
});

client.login(token); //Client login

module.exports = {
  client: client,
  user_mutes_db: user_mutes_db,
  blacklist_db: blacklist_db,
  triggers_db: triggers_db,
  channel_mutes_db: channel_mutes_db,
  lang_db: lang_db,
  __: __
};

/* JOIN US on our Discord: https://discord.gg/YHvfUqVgWS.

Bot developers:

  Bobrobot1#1408
  CatusKing#2624
  Jet#2471
  pengu#1111
  HAHALOSAH#4627
  Parotay | Luke#3210

Message from developers:

  There is always hope, and even if the world seems dark right now, I know that anyone can make it through this.


                .=%+.
              .....=%%*=:.
            .........--=+*#*-
           ................:+#+
         .....................=%+.
        ........................=%*.
      ............................=%*.
     ...............................=%*:       ::      .===.
    ..................................=%#-  +#*=+##- :##-:-+#-
   -:.................................:+%%%@@-....-#@@@:....:+%=
   %%=.........:-....................*@#+=+%@*:.....-#@#-.....:+%=
    *@=........+@#:.................=@#.....=%@+:.....-#@#-.....:+%+
     @%:........-%%-................:%@=......=%@+:.....-#@#-.....:+%+
     #@:.........-@%:.........::.....:#@%=......=%@+:.....-#@#-.....:+%+.
     +@:..........*@+.........*@*:.:+%@%%@%=......=%@+:.....-#@#-.....:+@+.
     =@-..........=@*..........=#@*#@+...:*@%=......=%@+:.....-#%:......:+@+.
     .@=..........#@=....==......=*@@-.....:*@%=......=%@+:...............:+@+
      *@-........+@*.....+@%=......=%@*:.....:*@%=......=%@+................:+%+
       *@*:.....:#@#-.....:+@%=......=%@*:.....:*@%=......=+:.................:+%+
        :#@+:.....-#@#-.....:+@%=......=%@*:.....:*@%=..........................:+%:
          :#@+:.....-#@#-.....:+@%=......=%@*:.....:*@+...........................-@:
            :#@+:.....-#@#-.....:+@%=......=%@*:...................................##
              :#@+:.....-%@#-.....:+@%=......#@@*:.................................#@:
                :%@+:....-@@@#-.....:+@%=:.:+@+:+@*:...............................:*@+:
                  -#@+:..+@=.+@#-.....#@%@%%*:    +@*:...............................:*=
                    :*@*#@-    +@#=--*@+           .*@*:..............................
                      .-=        -+#+-               :#@*:............................
                                        :*@%######****#@%@*:.........................
                                       *@+:.....:-====-..-#@*:......................
                                       *%+=:...............-##:...................
                                        .=*#%%*+=:...............................
                                             .:=*#%%*+-:........................
                                                   .:=*#%#*++++**##%*:........
                                                          :--=--::::+@*:....
                                                                      +%*.
*/
