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
const { prefix, token, triggers, insults, langlist, langinfo, botPerms, activityResetTimeout_SECONDS} = require('./config.json');
const Database = require('simplest.db');
const unleet = import("@cityssm/unleet");

const db = new Database({
  path: './data.json'
});
let lastMessage = null;

activityResetTimeout_SECONDS *= 1000;

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
  const server_language = db.get(`lang_${message.guild.id}`)
  if (typeof server_language === 'string') lang = server_language;

  let LCM = message.content.toLowerCase(); //Lower case message text
  const { suicidetitle, suicideauthor, suicidedescription, suicidefield1heading, suicidefield1, suicidefield2heading, suicidefield2, suicidefield3heading, suicidefield3, suicidefield4heading, suicidefield4, suicidefield5heading, suicidefield5, suicidefield6heading, suicidefield6, suicidefield7heading, suicidefield7, suicidefield8heading, suicidefield8, suicidefooter, insulttitle, insultauthor, insultdescription, dmembedtitle, dmembedauthor, dmembeddescription, dmembedfield1heading, dmembedfield1, dmembedfield2heading, dmembedfield2, dmembedfield3heading, dmembedfield3, dmembedfield4heading, dmembedfield4, dmembedfield5heading, dmembedfield5, dmembedfield6heading, dmembedfield6, dmembedfield7heading, dmembedfield7, dmembedfield8heading, dmembedfield8, dmembedfooter, infotitle, infoauthor, infodescription, infofield1heading, infofield1, infofield2heading, infofield2, infofield3heading, infofield3, infofield4heading, infofield4, infofooter, helpcommands, helplinks, helpauthor, helptitle, helpfield1heading, helpfield2heading, helpfield3heading, helpfield3, invitetitle, invitedescription, langstitle, langsauthor, langsfield1heading, langsfield1, bot2, bot3, bot4, wsping, rtping, pinging, addtoserver, nolang, langsus, mute2, mute3, dmmute2, dmmute3, dmmute4, dmmute5, mention, mention1, sent, seterror, } = require(`./lang/${lang}.json`);

  var possible_LCMs = (await unleet).default(LCM); // Returns an array of possible unl33ted messages (some l33tcodes may have different meanings)

  // Mention bot will activate alert message without triggers
  if (message.mentions.users.first() === client.user) {
    const suicide = new MessageEmbed()
      .setColor('#04d384')
      .setTitle(`${suicidetitle}`)
      .setAuthor(`${suicideauthor}`, 'https://spbot.ml/siround.png')
      .setDescription(`${suicidedescription}`)
      .addField(`${suicidefield1heading}`, `${suicidefield1}`, false)
      .addField(`${suicidefield2heading}`, `${suicidefield2}`, true)
      .addField(`${suicidefield3heading}`, `${suicidefield3}`, true)
      .addField(`${suicidefield4heading}`, `${suicidefield4}`, true)
      .addField(`${suicidefield5heading}`, `${suicidefield5}`, true)
      .addField(`${suicidefield6heading}`, `${suicidefield6}`, true)
      .addField(`${suicidefield7heading}`, `${suicidefield7}`, true)
      .addField(`${suicidefield8heading}`, `${suicidefield8}`, false)
      .setFooter(`${suicidefooter}`, 'https://spbot.ml/siround.png');

    return message.channel.send({ embeds: [suicide] });
  }

  if (db.get(`mute_${message.author.id}`) == null) { //Check to see if you muted the bot (User side only)
    const commonElements = [];
    const parsedTriggers = triggers.map(x => x.replace(/\|/g, " *"));
    parsedTriggers.forEach(trigger => { // Loop ever each trigger and check if they match the message
      possible_LCMs.forEach(unleeted_LCM => { // Loop over every possible unleeted message to match with trigger
        if (new RegExp(trigger, "g").test(unleeted_LCM)) {
          commonElements.push(true)
        }
      });
    })
    if (commonElements.length > 0) {
      const suicide = new MessageEmbed()
        .setColor('#04d384')
        .setTitle(`${suicidetitle}`)
        .setAuthor(`${suicideauthor}`, 'https://spbot.ml/siround.png')
        .setDescription(`${suicidedescription}`)
        .addField(`${suicidefield1heading}`, `${suicidefield1}`, false)
        .addField(`${suicidefield2heading}`, `${suicidefield2}`, true)
        .addField(`${suicidefield3heading}`, `${suicidefield3}`, true)
        .addField(`${suicidefield4heading}`, `${suicidefield4}`, true)
        .addField(`${suicidefield5heading}`, `${suicidefield5}`, true)
        .addField(`${suicidefield6heading}`, `${suicidefield6}`, true)
        .addField(`${suicidefield7heading}`, `${suicidefield7}`, true)
        .addField(`${suicidefield8heading}`, `${suicidefield8}`, false)
        .setFooter(`${suicidefooter}`, 'https://spbot.ml/siround.png')
      return message.author.send({ embeds: [suicide] }).catch(e => { message.channel.send(suicide) });

    }
    let args = LCM.trim().split(/ +/);
    args = args.map(x => x.replace(/\t/g, ""))
    if (commonElements.length < 1) {
      const parsedInsultTriggers = insults.map(x => x.replace(/\|/g, " *"));
      //console.log(parsedTriggers)
      parsedInsultTriggers.forEach(trigger => { // Loop ever each insult and check if they match the message
        possible_LCMs.forEach(unleeted_LCM => { // Loop over every possible unleeted message to match with insult
          if (new RegExp(trigger, "g").test(unleeted_LCM)) {
            commonElements.push(true)
          }
        });
      })
      if (commonElements.length > 0) {
        const insult = new MessageEmbed()
          .setColor('#04d384')
          .setTitle(`${insulttitle}`)
          .setAuthor(`${insultauthor}`, 'https://spbot.ml/siround.png')
          .setDescription(`${insultdescription}`)
        message.channel.send({ embeds: [insult] }).catch(console.err)
      }
    }
  } 





  //----------BEGIN COMMANDS AREA----------
  //Ping command
  const loading = client.emojis.cache.get("838616104687108117");
  if (LCM === '(ping' || LCM === ')ping' || LCM === '\\ping' || LCM === '~ping' || LCM === '|ping' || LCM === '!ping' || LCM === '?ping' || LCM === '.ping' || message.content === '$ping' || LCM === '%ping' || LCM === '-ping' || LCM === '--ping' || LCM === '=ping' || LCM === '+ping' || LCM === '_ping' || LCM === '/ping' || LCM === '&ping' || LCM === '--ping' || LCM === "`ping" || LCM === 'sp!ping') {
    message.channel.send(`${loading} Pinging...`).then((msg) => {
      msg.edit("\u200B");
      const ping = new MessageEmbed()
        .setColor('#04d384')
        .setTitle('Here is my ping young one')
        .setDescription(`Roundtrip latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms \nAPI Latency is ${Math.round(client.ws.ping)}ms`)
      msg.edit({ embeds: [ping] });
    });
    return;
  }

  //Command handler: Return if not prefixed
  if (!LCM.startsWith(prefix)) return;
  const arguments = LCM.slice(prefix.length).trim().split(' ');
  const command = arguments.shift().toLowerCase();

  //Bot info command
  if (['bot'].includes(command) || ['neofetch'].includes(command) || ['v'].includes(command)) {
    const cpuemoji = client.emojis.cache.get("837909574966968371");
    const pcemoji = client.emojis.cache.get("837909575034339369");
    const hddemoji = client.emojis.cache.get("837909575101448244");
    const ramemoji = client.emojis.cache.get("837909575415234590");
    const logoemoji = client.emojis.cache.get("832187920676421672");
    const os = require('os');
    const core = os.cpus()[0];
    const { version: djsversion } = require("discord.js");
    const { version } = require('./config.json');
    const bot = new MessageEmbed() //No need to be translated!
      .setColor('#04d384')
      .setFooter(bot2)
      .addFields(
        {name: `**❯ ${bot3}** ${client.user.tag} (${client.user.id})`,value: `**❯ ${bot4}** ${client.guilds.cache.size.toLocaleString()} `},
      )
      .addFields(
        {name: `**❯ ${pcemoji}:** ${Math.floor(client.uptime / 86400000)}d ${Math.floor(client.uptime / 3600000) % 24}hr ${Math.floor(client.uptime / 60000) % 60}min ${Math.floor(client.uptime / 1000) % 60}sec`,value: '\u200b'},
        {name: `**❯ ${hddemoji}:** ${os.platform()},${os.release()}`,value: '\u200b'},
        {name: `❯ ${core.model}`,value: `${os.cpus().length} x ${core.speed}MHz`},
        {name: `**❯ ${ramemoji}:** ${Math.floor(((os.freemem()) / 10000000)) / 100}GiB/${Math.floor(((os.totalmem()) / 10000000)) / 100}GiB`,value: '\u200b'},
        {name: `**❯ Bot:**`,value: `Node.js: ${process.version} - Discord.js: v${djsversion} - ${logoemoji}: v${version}`},
      )
      .setTimestamp();
    message.channel.send({ embeds: [bot] });

    //Info command
  } else if (['info'].includes(command) || ['bilgi'].includes(command)) {
    const info = new MessageEmbed()
      .setColor('#04d384')
      .setAuthor(infoauthor, 'https://spbot.ml/siround.png')
      .setTitle(infotitle)
      .setURL('https://spbot.ml')
      .setThumbnail('https://spbot.ml/siround.png')
      .addField(infofield1heading, infofield1)
      .addField(infofield2heading, infofield2)
      .addField(infofield3heading, infofield3)
      .addField(infofield4heading, infofield4)
      .setImage('https://spbot.ml/sc2.png')
      .setFooter(infofooter)
    message.channel.send({ embeds: [info] });


    //Help command
  } else if (['help'].includes(command) || ['yardım'].includes(command)) {
    const help = new MessageEmbed()
      .setColor('#04d384')
      .setAuthor(helpauthor, 'https://spbot.ml/siround.png')
      .setTitle(helptitle)
      .setURL('https://spbot.ml')
      .addField(helpfield1heading, helpcommands)
      .addField(helpfield2heading, helplinks)
      .addField(helpfield3heading, helpfield3)
    message.channel.send({ embeds: [help] });

    //Invite command
  } else if (['invite'].includes(command) || ['davet'].includes(command)) {
    const invite = new MessageEmbed()
      .setColor('#04d384')
      .setTitle(invitetitle)
      .setURL('https://spbot.ml/')
      .setDescription(invitedescription)
      .setImage('https://www.spbot.ml/suicideicon.png')
    message.channel.send({ embeds: [invite] });







    //Mute command
    //main mute command
  } else if (['mute'].includes(command) || ['sustur'].includes(command)) {
    if (db.get(`mute_${message.author.id}`)) { //db.get(`lang_
      db.delete(`mute_${message.author.id}`)
      message.channel.send(mute2) //"Removed from ignore list"
    } else {
      db.set(`mute_${message.author.id}`, true)
      message.channel.send(mute3) //"I will now ignore your trigger words"
    }

    //dm mute command
  } else if (['dmmute'].includes(command) || ['ömsustur'].includes(command)) {
    if (db.get(`dmmute_${message.author.id}`)) {
      db.delete(`dmmute_${message.author.id}`)
      message.channel.send(dmmute2)
    } else {
      db.set(`dmmute_${message.author.id}`, true)
      message.channel.send(dmmute3)
    }

    //Dm Command
  } else if (command == 'dm' || command == 'öm') {
    let mention = message.mentions.users.first();

    if (!mention) return message.channel.send(mention1); // checking if message don't have a user mention
    if (db.get(`dmmute_${message.author.id}`)) return message.channel.send(dmmute5); //Check to see if you muted the bot (User side only)
    message.channel.send(sent);
    //dm embed ADD THIS. 
    const dmembed = new MessageEmbed()
      .setColor('#04d384')
      .setTitle(`${dmembedtitle}`)
      .setURL('https://spbot.ml/')
      .setImage('https://www.spbot.ml/suicideicon.png')
      .setAuthor(`${dmembedauthor}`, 'https://spbot.ml/siround.png')
      .setDescription(`${dmembeddescription}`)
      .addField(`${dmembedfield1heading}`, `${dmembedfield1}`, false)
      .addField(`${dmembedfield2heading}`, `${dmembedfield2}`, true)
      .addField(`${dmembedfield3heading}`, `${dmembedfield3}`, true)
      .addField(`${dmembedfield4heading}`, `${dmembedfield4}`, true)
      .addField(`${dmembedfield5heading}`, `${dmembedfield5}`, true)
      .addField(`${dmembedfield6heading}`, `${dmembedfield6}`, true)
      .addField(`${dmembedfield7heading}`, `${dmembedfield7}`, true)
      .addField(`${dmembedfield8heading}`, `${dmembedfield8}`, false)
      .setFooter('I care about you. Please try to give the helplines just one chance. I know you can make it through this. Report a bug: https://discord.gg/YHvfUqVgWS. Website: https://spbot.ml/. Type sp!dmmute to prevent others from telling me to send you DMs', 'https://spbot.ml/siround.png')

    mention.send({ embeds: [dmembed] }).catch(e => {
      message.channel.send(dmmute4); //If dm command has an error
    });

    //Change language command
  } else if (command == 'set' || command == 'ayarla') {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`:x: | ${seterror}`); //Checks to see if you have admin perms

    //Array for checking which language the user selected
    let langShort;
    for (l of langinfo) {
      if (l.includes(arguments[0])) {
        langShort = l[0];
      }
    }
    if (!langShort) return message.channel.send(nolang);
    if (langShort !== "en") db.set(`lang_${message.guild.id}`, langShort);
    else db.delete(`lang_${message.guild.id}`);
    return message.channel.send(require(`./lang/${langShort}.json`).langsus);

  } else if (['lang'].includes(command)) {
    const langs = new MessageEmbed()
      .setColor('#04d384')
      .setTitle(langstitle)
      .setAuthor(langsauthor)
      .setDescription(langlist.toString())
      .setURL('https://spbot.ml/')
      .addField(langsfield1heading, langsfield1)
      .setImage('https://www.spbot.ml/suicideicon.png')
    message.channel.send({ embeds: [langs] });
  }
});

//And... client login...
client.login(token);



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
