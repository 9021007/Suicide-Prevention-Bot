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
const { prefix, token, botPerms, devGuildId } = require('./config.json');

var { activityResetTimeout_SECONDS } = require('./config.json');
activityResetTimeout_SECONDS *= 1000;

const Database = require('simplest.db');

const db = new Database({
  path: './data.json'
});
let lastMessage = null;


// Setup bot ready callback
client.once('ready', async () => {
  console.log(`[+] Logged in as ${client.user.tag}!`); // Console log for verbosity
  setInterval(() => {
    const users = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString();
    const servers = client.guilds.cache.size.toLocaleString();
    client.user.setActivity(
      `chat for suicide. https://spbot.ml/ — ${servers} servers/${users} users`, {
      type: 'LISTENING'
    }
    );
  }, activityResetTimeout_SECONDS); // Update status every 15 seconds.

  // Registers commands
  var commands = [
    require('./commands/dm').command,
    require("./commands/ping").command,
    require("./commands/status").command,
  ];

  // Get dev guild ID for slash commands, comment to use global slash commands
  const devGuild = client.guilds.cache.get(devGuildId);
  if (typeof devGuild == "undefined") {
    client.application.commands.set(commands);
    console.log("[+] Set global commands");
  } else {
    devGuild.commands.set(commands);
    console.log("[+] Set guild commands");
  }
});

/**
* Commands
*/
client.on('messageCreate', async message => {
  lastMessage = message;

  // Verify permissions of user who sent message before continuing.
  if (message.author.bot || message.channel.type === 'DM' || !message.channel.permissionsFor(client.user).has(botPerms)) return;

  let lang = "en";
  const server_language = db.get(`lang_${message.guild.id}`);
  if (typeof server_language === 'string') lang = server_language;

  let LCM = message.content.toLowerCase(); //Lower case message text

  // Mention bot will activate alert message without triggers
  if (message.mentions.users.first() === client.user)
    return require('./split/bot-mentioned')(message, lang);

  //Check to see if you muted the bot (User side only)
  if (db.get(`mute_${message.author.id}`) == null) 
    require('./split/every-unmuted-message')(message, lang);

  if (!LCM.startsWith(prefix)) return; //Return if not prefixed

  const arguments = LCM.slice(prefix.length).trim().split(" ");
  const command = arguments[0].toLowerCase();

  switch (command) {
    case 'bot':
      return require('./commands/status')(message, lang);
    case 'info':
      return require('./commands/info')(message, lang);
    case 'bilgi':
      return require('./commands/info')(message, lang);
    case 'help':
      return require('./commands/help')(message, lang);
    case 'yardım':
      return require('./commands/info')(message, lang);
    case 'invite':
      return require('./commands/invite')(message, lang);
    case 'davet':
      return require('./commands/invite')(message, lang);
    case 'mute':
      return require('./commands/mute')(message, lang);
    case 'sustur':
      return require('./commands/mute')(message, lang);
    case 'dmmute':
      return require('./commands/dmmute')(message, lang);
    case 'ömsustur':
      return require('./commands/dmmute')(message, lang);
    case 'set':
      return require('./commands/set')(message, lang);
    case 'ayarla':
      return require('./commands/set')(message, lang);
    case 'lang':
      return require('./commands/lang')(message, lang);
  };
});


/**
 * Slash Commands
 */
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  var lang = "en";
  const server_language = db.get(`lang_${interaction.guild.id}`);
  if (typeof server_language === 'string') lang = server_language;

  const { commandName, options } = interaction;
  switch (commandName) {
    case "dm":
      return require('./commands/dm').default(interaction, lang);
    case "ping":
      return require('./commands/ping').default(interaction, lang);
    case "status":
      return require('./commands/status').default(interaction, lang);
  }
});


client.login(token); //Client login

module.exports = {
  client: client,
  db: db
};

/* JOIN US on our Discord: https://discord.gg/YHvfUqVgWS.

Bot developers:

  Bobrobot1#1408
  CactusKing101#2624
  Killerjet101#7638
  pengu#1111
  HAHALOSAH#4627
  Parotay | Luke#3210
  CPlusPatch#9373

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
