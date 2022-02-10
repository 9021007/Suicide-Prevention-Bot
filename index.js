// #region Beginning ASCII Art
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
// #endregion


// #region Initialization
// #region Error handling
process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {

    console.error(err, 'Uncaught Exception caught');
  });
// #endregion

const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.DIRECT_MESSAGES] });
const { prefix, token, triggers, insults, langlist, langinfo, botPerms} = require('./config.json');

var { activityResetTimeout_SECONDS } = require('./config.json');
activityResetTimeout_SECONDS *= 1000;

const Database = require('simplest.db');
const unleet = import("@cityssm/unleet");

const db = new Database({
  path: './data.json'
});
let lastMessage = null;


// Setup bot ready callback
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`); // Console log for verbosity
  setInterval(() => {
    const users = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString();
    const servers = client.guilds.cache.size;
    client.user.setActivity(
	    `chat for suicide. https://spbot.ml/ — ${servers} servers/${users} users`, 
	    { type: 'LISTENING'}
	); 
  }, activityResetTimeout_SECONDS); // Update status every 15 seconds.
});

// #endregion

// Message event listener
client.on('messageCreate', async message => { 
  lastMessage = message;

  // Verify permissions of user who sent message before continuing.
  if (message.author.bot || message.channel.type === 'DM' || !message.channel.permissionsFor(client.user).has(botPerms)) return;

  let lang = "en";
  const server_language = db.get(`lang_${message.guild.id}`);
  if (typeof server_language === 'string') lang = server_language;

  let LCM = message.content.toLowerCase(); //Lower case message text
  var possible_LCMs = (await unleet).default(LCM); // Returns an array of possible unl33ted messages (some l33tcodes may have different meanings)
  const { suicidetitle, suicideauthor, suicidedescription, suicidefield1heading, suicidefield1, suicidefield2heading, suicidefield2, suicidefield3heading, suicidefield3, suicidefield4heading, suicidefield4, suicidefield5heading, suicidefield5, suicidefield6heading, suicidefield6, suicidefield7heading, suicidefield7, suicidefield8heading, suicidefield8, suicidefooter, insulttitle, insultauthor, insultdescription, dmembedtitle, dmembedauthor, dmembeddescription, dmembedfield1heading, dmembedfield1, dmembedfield2heading, dmembedfield2, dmembedfield3heading, dmembedfield3, dmembedfield4heading, dmembedfield4, dmembedfield5heading, dmembedfield5, dmembedfield6heading, dmembedfield6, dmembedfield7heading, dmembedfield7, dmembedfield8heading, dmembedfield8, dmembedfooter, infotitle, infoauthor, infodescription, infofield1heading, infofield1, infofield2heading, infofield2, infofield3heading, infofield3, infofield4heading, infofield4, infofooter, helpcommands, helplinks, helpauthor, helptitle, helpfield1heading, helpfield2heading, helpfield3heading, helpfield3, invitetitle, invitedescription, langstitle, langsauthor, langsfield1heading, langsfield1, bot2, bot3, bot4, wsping, rtping, pinging, addtoserver, nolang, langsus, mute2, mute3, dmmute2, dmmute3, dmmute4, dmmute5, mention, mention1, sent, seterror, } = require(`./lang/${lang}.json`);


  // Mention bot will activate alert message without triggers
  if (message.mentions.users.first() === client.user)
    return require('./split/bot-mentioned')(message, lang);

  if (db.get(`mute_${message.author.id}`) == null) //Check to see if you muted the bot (User side only)
    require('./split/every-unmuted-message')(message, lang);

  // #region Commands
  // Ping command
  
  if (LCM === '(ping' || LCM === ')ping' || LCM === '\\ping' || LCM === '~ping' || LCM === '|ping' || LCM === '!ping' || LCM === '?ping' || LCM === '.ping' || LCM === '$ping' || LCM === '%ping' || LCM === '-ping' || LCM === '--ping' || LCM === '=ping' || LCM === '+ping' || LCM === '_ping' || LCM === '/ping' || LCM === '&ping' || LCM === '--ping' || LCM === "`ping" || LCM === 'sp!ping')
    return require('./commands/ping')(message, lang);

  // Command handler: Return if not prefixed
  if (!LCM.startsWith(prefix)) return;
  const arguments = LCM.slice(prefix.length).trim().split(' ');
  const command = arguments.shift().toLowerCase();

  switch(command) {
    case 'bot':
      return require('./commands/neofetch')(message, lang);
    case 'neofetch':
      return require('./commands/neofetch')(message, lang);
    case 'v':
      return require('./commands/neofetch')(message, lang);
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
    case 'dm':
      return require('./commands/dm')(message, lang);
    case 'öm':
      return require('./commands/dm')(message, lang);
    case 'set':
      return require('./commands/set')(message, lang);
    case 'ayarla':
      return require('./commands/set')(message, lang);
    case 'lang':
      return require('./commands/lang')(message, lang);
  };
  //#endregion
});

//And... client login...
client.login(token);

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
