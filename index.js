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
MMMMMMMMMMWk,.                 .,kWMMMMMMMMMM
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

//required libraries and files
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token, triggers, insults, version } = require('./config.json');
const { version: djsversion } = require("discord.js");
const data = require('./data.json');
const fs = require('fs');
const os = require('os');
//const db = require('quick.db');


//Ready bot client ;)
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`); //let us know we're good to go
  client.user.setActivity('chat for suicide. https://spbot.ml/', { type: 'LISTENING' }); //On init, add status
});

//aleart embed
const suicide = new Discord.MessageEmbed()
  .setColor('#04d384')
  .setTitle('Suicide Prevention Bot')
  .setAuthor('Please give the helpline just one chance', 'https://spbot.ml/siround.png')
  .setDescription('This bot has automatically detected a keyword related to suicide\n')
  .addField("Please listen to me.", "Your life is important. We all care very deeply about you. I understand you don't feel like you matter right know, but I can tell you with 100% confidence that you do. I know you might be reluctant, but please just give the suicide prevention hotline just one more chance.", false)
  .addField('United States', 'Call (800) 273-8255 or Text HOME to 741741', true)
  .addField('United Kingdom', 'Call 116-123 or Text SHOUT to 85258', true)
  .addField('Canada', 'Call (833) 456-4566 or Text 45645', true)
  .addField('India', 'Call +91 80 23655557', true)
  .addField('Japan', 'Call 810352869090', true)
  .addField('Other Countries?', '[Click Here.](https://www.opencounseling.com/suicide-hotlines)', true)
  .addField('Need Extra Support?', 'Come talk to real people to help you through this Discord! [Click here.](https://discord.gg/sdY4jyY)')
  .setFooter('I care about you. Please try to give the helplines just one chance. I know you can make it through this. Report a bug: https://discord.gg/YHvfUqVgWS. Website: https://spbot.ml/. Type sp!mute to have the bot ignore your messages.', 'https://spbot.ml/siround.png')

//insult embed
const insult = new Discord.MessageEmbed()
  .setColor('#04d384')
  .setTitle('Suicide Prevention Bot')
  .setAuthor("Please don't insult others")
  .setDescription("This is NOT a laughing matter.")







client.on('message', message => { //Message event listener
  var muted = data.muted;
  var dmmute = data.dmmute;
  var commonElements = [];
  //Map out the message
  if (message.author.bot || message.channel.type != 'text') return; //Ignore Bots
  LCM = message.content.toLowerCase(); //Lower Case Message text
  LCM = LCM.replace(/\s\s+/g, '\t'); //regex for multiple spaces
  LCM = LCM.replace(/\$/g, "s") //Replace $ with s
  LCM = LCM.replace(/\@/g, "a") //Replace @ with a
  LCM = LCM.replace(/1/g, "i") //Replace 1 with i
  LCM = LCM.replace(/3/g, "e") //Replace 3 with e
  LCM = LCM.replace(/4/g, "a") //Replace 4 with a
  LCM = LCM.replace(/5/g, "s") //Replace 5 with s
  LCM = LCM.replace(/6/g, "g") //Replace 6 with g
  LCM = LCM.replace(/7/g, "t") //Replace 7 with t
  LCM = LCM.replace(/0/g, "o") //Replace 0 with o
  LCM = LCM.replace(/8/g, "b") //Replace 8 with b
  LCM = LCM.replace(/z/g, "s") //Replace z with s
  LCM = LCM.replace(/wanna/g, "want to") //Replace wanna with want to
  LCM = LCM.replace(/your/g, "👇")  //WHY
  LCM = LCM.replace(/ur/g, "your") //Replace ur with your
  LCM = LCM.replace(/👇/g, "your") //replace 👇 with your
  LCM = LCM.replace(/\-+/g, " ") //Replace - with <space>
  LCM = LCM.replace(/\–+/g, " ") //Replace – with <space> //THESE THREE ARE DIFFERENT CHARACTERS
  LCM = LCM.replace(/\—+/g, " ") //Replace – with <space>
  var commonElements = [];
  var parsedTriggers = triggers.map(x => x.replace(/\|/g, " *"))
  //console.log(parsedTriggers)
  parsedTriggers.forEach(trigger => {
    if (new RegExp(trigger, "g").test(LCM)) {
      commonElements.push(true)
    }
  })
  if (commonElements.length > 0) {
    console.log("Suicide Triggered")
    return message.author.send(suicide).catch(e => { message.channel.send(suicide) });
  }
  var args = LCM.trim().split(/ +/);
  args = args.map(x => x.replace(/\t/g, ""))
  if (commonElements.length < 1) {
    var parsedInsultTriggers = insults.map(x => x.replace(/\|/g, " *"))
    //console.log(parsedTriggers)
    parsedInsultTriggers.forEach(trigger => {
      if (new RegExp(trigger, "g").test(LCM)) {
        commonElements.push(true)
      }
    })
    if (commonElements.length > 0) {
      message.channel.send(insult).catch(console.err)
      console.log("Insult Triggered")
    };
    return
  }
  /*var noSpace = triggers.map(x => x.replace(/\|/g, ""))
  var Space = triggers.map(x => x.replace(/\|/g, " "))
  if (message.author.bot) return;
  LCM = LCM.replace(/\s\s+/g, '\t');
  var args = LCM.trim().split(/ +/);
  args = args.map(x => x.replace(/\t/g, ""))
  var commonElements = args.filter(function(e) {
    return noSpace.indexOf(e) > -1;
  });
  if(commonElements.length > 0) return message.author.send(embed).catch(e => { message.channel.send(embed) });
  Space.forEach((phrase, index) => {
    var arr = phrase.split(" ")
    var commonElements = args.filter(function(e) {
      return arr.indexOf(e) > -1;
    });
    if(commonElements.length == arr.length) {
      message.author.send(embed).catch(e => {
        message.channel.send(embed)
      })
      index = Space.length
    }
  })
  */



  //ADD LANGUAGE SUPPORT

<<<<<<< Updated upstream
  //Main alert embed
  const suicide = new Discord.MessageEmbed()
    .setColor('#04d384')
    .setTitle('Suicide Prevention Bot')
    .setAuthor('Please give the helpline just one chance', 'https://spbot.ml/siround.png')
    .setDescription('This bot has automatically detected a keyword related to suicide\n')
    .addField("Please listen to me.", "Your life is important. We all care very deeply about you. I understand you don't feel like you matter right know, but I can tell you with 100% confidence that you do. I know you might be reluctant, but please just give the suicide prevention hotline just one more chance.", false)
    .addField('United States', 'Call (800) 273-8255 or Text HOME to 741741', true)
    .addField('United Kingdom', 'Call 116-123 or Text SHOUT to 85258', true)
    .addField('Canada', 'Call (833) 456-4566 or Text 45645', true)
    .addField('India', 'Call +91 80 23655557', true)
    .addField('Japan', 'Call 810352869090', true)
    .addField('Other Countries?', '[Click Here!](https://www.opencounseling.com/suicide-hotlines)', true)
    .addField('Need Extra Support?', 'Come talk to real people to help you through this! [Join here!](https://discord.gg/sdY4jyY)')
    .setFooter('We care about you. Please try to give the helplines just one chance. I know you can make it through this. Report a bug: https://discord.gg/YHvfUqVgWS. Website: https://spbot.ml/. Type sp!mute to have the bot ignore your messages.', 'https://spbot.ml/siround.png')

    //Mention bot will activate alert message without triggers
  if (message.mentions.has(client.user) && message.content.includes(client.user.id)) {
=======


  //Main alert embed

  //Mention bot will activate aleart message without triggers
  if (message.mentions.has(client.user)) {
>>>>>>> Stashed changes
    message.channel.send(suicide);
  }

  if (muted.includes(message.author.id)) return; //Check to see if you muted the bot (User side only)

  //Main alert handler
  if (commonElements.length > 0) return message.author.send(suicide).catch(e => { message.channel.send(suicide) });
  /*Space.forEach((phrase, index) => {
    var arr = phrase.split(" ")
    var commonElements = args.filter(function (e) {
      return arr.indexOf(e) > -1;
    });
    if (commonElements.length == arr.length) {
      message.author.send(suicide).catch(e => {
        message.channel.send(suicide)
      })
      index = Space.length
    }
  })*/
});

// BEGIN COMMANDS AREA
client.on('message', async message => { //Message event listener

  var muted = data.muted;
  var dmmute = data.dmmute;


  if (message.author.bot || message.channel.type != 'text') return; //Ignore Bots

  //Pings for when somebody pings in a bot-heavy server.
<<<<<<< Updated upstream
  if (['!ping', '?ping', '.ping', '$ping', '%ping', '-ping', '--ping', '=ping', '+ping', '_ping', '/ping', '&ping', '--ping', "`ping"].includes(message.content.toLowerCase())) {
=======
  if (LCM === '(ping' || LCM === ')ping' || LCM === '\\ping' || LCM === '~ping' || LCM === '|ping' || LCM === '!ping' || LCM === '?ping' || LCM === '.ping' || message.content === '$ping' || LCM === '%ping' || LCM === '-ping' || LCM === '--ping' || LCM === '=ping' || LCM === '+ping' || LCM === '_ping' || LCM === '/ping' || LCM === '&ping' || LCM === '--ping' || LCM === "`ping" || LCM === 'sp!ping') {
>>>>>>> Stashed changes
    message.channel.send('Pinging...').then((msg) => {
      const ping = new Discord.MessageEmbed()
        .setColor('#04d384')
        .setTitle('Pong!')
        .setDescription(`Roundtrip latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms \nAPI Latency is ${Math.round(client.ws.ping)}ms`)
        .addField('How do I add you to my server?', 'Go to https://spbot.ml/ and click on ADD BOT.')
      msg.edit(ping);
      msg.edit("\u200B");
    });
    return;
  }

  //Command handler: Return if not prefixed
<<<<<<< Updated upstream
  if (!message.content.toLowerCase().startsWith(prefix)) return;
  const arguments = message.content.slice(prefix.length).trim().split(' ');
=======
  if (!LCM.startsWith(prefix)) return;
  const arguments = LCM.slice(prefix.length).trim().split(' ');
>>>>>>> Stashed changes
  const command = arguments.shift().toLowerCase();




  //Bot info command
  if (['bot'].includes(command) || ['neofetch'].includes(command)) {
    const core = os.cpus()[0];
    const embed = new Discord.MessageEmbed()
      .setColor('#04d384')
      .setFooter('Does not update after you send the command. Send again to see updated info.', 'https://spbot.ml/siround.png')
      .addField('General', [
        `**❯ Client:** ${client.user.tag} (${client.user.id})`,
        `**❯ Server Count:** ${client.guilds.cache.size.toLocaleString()} `,
        '\u200b'
      ])
      .addField('System', [
        `**❯ Uptime:** ${Math.floor(client.uptime / 86400000)}d ${Math.floor(client.uptime / 3600000) % 24}hr ${Math.floor(client.uptime / 60000) % 60}min ${Math.floor(client.uptime / 1000) % 60}sec`,
        `**❯ OS:**`,
        `\u3000 Platform: ${os.platform()}`,
        `\u3000 Release: ${os.release()}`,
        `**❯ CPU:**`,
        `\u3000 Cores: ${os.cpus().length}`,
        `\u3000 Model: ${core.model}`,
        `\u3000 Current Speed: ${core.speed}MHz`,
        `**❯ Memory:**`,
        `\u3000 Total: ${Math.floor(((os.totalmem()) / 10000000)) / 100}GiB`,
        `\u3000 Used: ${Math.floor(((os.freemem()) / 10000000)) / 100}GiB`,
        `**❯ Bot:**`,
        `\u3000 Node.js: ${process.version}`,
        `\u3000 Version: v${version}`,
        `\u3000 Discord.js: v${djsversion}`,
      ])
      .setTimestamp();

    message.channel.send(embed);

    //Info command
  } else if (['info'].includes(command)) {
    const info = new Discord.MessageEmbed()
      .setColor('#04d384')
      .setAuthor('Suicide Prevention Bot Info', 'https://spbot.ml/siround.png')
      .setTitle("What is this bot?")
      .setURL('https://spbot.ml')
      .setThumbnail('https://spbot.ml/siround.png')
      .setDescription('Hi! I’m a helpful bot dedicated to helping those who are at risk of suicide. I watch for key words and phrases, and then act accordingly to direct users to help. I respond with both phone and text lines specific to their country, so they can receive the best help possible. I’m 100% OPEN SOURCE and ANONYMOUS.')
      .addField('What do you respond to?', 'I look for key words related to suicide, as well as commands like !help, !invite, and !ping.')
      .addField('How do I add you to my server?', 'Go to https://spbot.ml/ and click on ADD BOT.')
<<<<<<< Updated upstream
      .addField('Are you anonymous?', 'Yes. I am, and have always been, 100% anonymous. I\'m open source as well.')
      .addField('I have a bug report or feature request.', 'Join my Discord server (link at https://spbot.ml/)')
=======
      .addField('Are you anonymous?', 'Yes. I am, and have always been, 100% anonmyous. I\'m open source as well.')
      .addField('I have a bug report or feature request.', '[Join the discord!](https://discord.com/invite/YHvfUqVgWS)')
>>>>>>> Stashed changes
      .setImage('https://spbot.ml/sc2.png')
      .setFooter('Created by @Bobrobot1#1408 | https://spbot.ml | sp!ignore to have the bot ignore your messages', 'https://spbot.ml/siround.png')
    message.channel.send(info);

    //Help command
  } else if (['help'].includes(command)) {
    const commands = ['help', 'neofetch (alias: bot)', 'info', 'invite (alias: mute)', 'ignore', 'ping', 'dm [user]', 'dmmute']
    const links = ['[Website](https://spbot.ml/)', '[Discord Invite](https://discord.com/invite/YHvfUqVgWS)', '[GitHub](https://github.com/Bobrobot1/Suicide-Prevention-Bot)', '[Status Page](https://spbot.freshstatus.io/)']
    const help = new Discord.MessageEmbed()
      .setColor('#04d384')
      .setAuthor('Suicide Prevention Bot Info', 'https://spbot.ml/siround.png')
      .setTitle('You requested help?')
      .addField('Commands - prefix is sp! [command here]', (commands))
      .addField('Links', (links))
      .addField('Need more help? Found a bug?', '[Join the discord!](https://discord.com/invite/YHvfUqVgWS)')

    message.channel.send(help)

    //Invite command
  } else if (['invite'].includes(command)) {
    const invite = new Discord.MessageEmbed()
      .setColor('#04d384')
      .setTitle('Add a Suicide Prevention Bot')
      .setURL('https://spbot.ml/')
      .setDescription('This Discord bot is an easy-to-use and easy-to-install bot for Discord, that actively prevents suicide and other crisis from ocuring. Add it to your Discord server in just 3 clicks.')
      .setImage('https://www.spbot.ml/suicideicon.png')
    message.channel.send(invite);

    //Mute command
    //main mute command
  } else if (['mute'].includes(command)) {
    if (muted.includes(message.author.id)) {
      for (var i = 0; i < muted.length; i++) {
        if (muted[i] == message.author.id) {
          muted.splice(i, 1); //IF NOT ON MUTE LIST THEN MUTE
          var embed = new Discord.MessageEmbed().setDescription('Removed you from the ignore list');
          message.channel.send(embed);
          break;
        }
      }
    } else {
      muted.push(message.author.id); //OTHERWISE, REMOVE FROM MUTE LIST
      var embed = new Discord.MessageEmbed().setDescription('I will now ignore your messages everywhere. Type sp!mute again to undo.');
      message.channel.send(embed);
    }
    var tempData = { muted: muted };
    let json = JSON.stringify(tempData);
    fs.writeFileSync('data.json', json);
    //dm mute command
  } else if (['dmmute'].includes(command)) {
    if (dmmute.includes(message.author.id)) {
      for (var i = 0; i < dmmute.length; i++) {
        if (dmmute[i] == message.author.id) {
          dmmute.splice(i, 1); //IF NOT ON MUTE LIST THEN MUTE
          var embed = new Discord.MessageEmbed().setDescription('Removed you from the DM ignore list');
          message.channel.send(embed);
          break;
        }
      }
    } else {
      dmmute.push(message.author.id); //OTHERWISE, REMOVE FROM MUTE LIST
      var embed = new Discord.MessageEmbed().setDescription('I will stop allowing others to send DMs to you via this bot. type sp!dmmute again to undo.');
      message.channel.send(embed);
    }
    var tempData = { dmmute: dmmute };
    let json = JSON.stringify(tempData);
    fs.writeFileSync('data.json', json);

    //Dm Command
  } else if (['dm'].includes(command)) {
    let mention = message.mentions.users.first();

    if (!mention) return message.channel.send('You need to mention a user.'); // checking if message don't have a user mention
    if (dmmute.includes(mention.id)) return message.channel.send('Mentioned user has opted out of user-directed bot DMs'); //Check to see if you muted the bot (User side only)

    //dm embed
    const dmembed = new Discord.MessageEmbed()
      .setColor('#04d384')
      .setTitle('A user has asked us to reach out to you')
      .setURL('https://spbot.ml/')
      .setDescription('This Discord bot is an easy-to-use and easy-to-install bot for Discord, that actively prevents suicide and other crisis from occuring. Add it to your Discord server in just 3 clicks.')
      .setImage('https://www.spbot.ml/suicideicon.png')
      .setAuthor('Please give the helpline just one chance', 'https://spbot.ml/siround.png')
      .setDescription('Somebody has asked us to reach out personally to you in your DMs. Please listen.\n')
      .addField("We care about you.", "Your life is important. We all care very deeply about you. I understand you don't feel like you matter right know, but I can tell you with 100% confidence that you do. I know you might be reluctant, but please just give the suicide prevention hotline just one more chance.", false)
      .addField('United States', 'Call (800) 273-8255 or Text HOME to 741741', true)
      .addField('United Kingdom', 'Call 116-123 or Text SHOUT to 85258', true)
      .addField('Canada', 'Call (833) 456-4566 or Text 45645', true)
      .addField('India', 'Call +91 80 23655557', true)
      .addField('Japan', 'Call 810352869090', true)
      .addField('Other Countries?', '[Click Here.](https://www.opencounseling.com/suicide-hotlines)', true)
      .addField('Need Extra Support?', 'Come talk to real people to help you through this Discord. [Click here.](https://discord.gg/sdY4jyY)')
      .setFooter('I care about you. Please try to give the helplines just one chance. I know you can make it through this. Report a bug: https://discord.gg/YHvfUqVgWS. Website: https://spbot.ml/. Type sp!dmmute to prevent others from telling me to send you DMs', 'https://spbot.ml/siround.png')

    mention.send(dmembed).catch(e => {
      message.channel.send("Unable to send DM. Error: Permission Denied"); //If dm command has an error
    });
  }

  /* Testing will need to be done
  //Testing command for language support
} else if (['set'].includes(command)) {
  if (args[0] === 'english') {
    db.delete(`lang_${message.guild.id}`);
    return message.channel.send('done changing language')

  } else if (args[0] === 'spanish') {
    db.set(`lang_${message.guild.id}`, 'sp')
    return message.channel.send('done changing language')
  } else {
    return;
  }
} else if (['test'].includes(command)) {
  let lang = await db.get(`lang_${message.guild.id}`);
  if (lang = null) {
    lang = 'en'
  } else if (lang == 'hi') {
    lang = 'hi'
  }
  let word = require(`./lang/${lang}.js`);
  return message.channel.send(word.test)
} */
});

//And... client login...
client.login(token);



/* JOIN US on our Discord: https://discord.gg/YHvfUqVgWS.

<<<<<<< Updated upstream
  Bobrobot1#1408
  CactusKing101#2624 the coolest one B)
  Killerjet101#7638
  pengu#1111
=======
Bot developers:
>>>>>>> Stashed changes

Bobrobot1#1408
CactusKing101#2624
Killerjet101#7638
pengu#1111
HAHALOSAH#4627
GideonBear#6654
Zemi#0020

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