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
MMMMMMMMMMWk,.      .          .,kWMMMMMMMMMM
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
const { prefix, token, triggers } = require('./config.json');
const data = require('./data.json');
const fs = require('fs');

//standard init
const client = new Discord.Client();

//get muted list as array
var muted = data.muted;

//Ready bot client ;)
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`); //let us know we're good to go
  client.user.setActivity('chat for suicide. https://spbot.ml/', { type: 'LISTENING' }); //On init, add status
});

client.on('message', message => { //Message event listener
  
  //Map out the message
  if (message.author.bot || message.channel.type != 'text') return; //Ignore Bots
  LCM = message.content.toLowerCase(); //Lower Case Message text
  var noSpace = triggers.map(x => x.replace(/\|/g, ""))
  var Space = triggers.map(x => x.replace(/\|/g, " "))
  LCM = LCM.replace(/\s\s+/g, '\t'); //regex for multiple spaces
  LCM = LCM.replace(/\$/g, "s") //Replace $ with s
  LCM = LCM.replace(/\@/g, "a") //Replace @ with a
  LCM = LCM.replace(/1/g, "i") //Replace 1 with i
  LCM = LCM.replace(/4/g, "a") //Replace 4 with a
  LCM = LCM.replace(/3/g, "e") //Replace 3 with e
  LCM = LCM.replace(/0/g, "o") //Replace 0 with o
  LCM = LCM.replace(/8/g, "b") //Replace 8 with b
  LCM = LCM.replace(/z/g, "s") //Replace z with s
  var args = LCM.trim().split(/ +/);
  args = args.map(x => x.replace(/\t/g, ""))
  var commonElements = args.filter(function (e) {
    return noSpace.indexOf(e) > -1;
  });

  //Main aleart embed
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
    .setFooter('I care about you. Please try to give the helplines just one chance. I know you can make it through this. Report a bug: https://discord.gg/YHvfUqVgWS. Website: https://spbot.ml/. Type sp!mute to have the bot ignore your messages.', 'https://spbot.ml/siround.png')

    //Mention bot will activate aleart message without triggers
  if (message.mentions.has(client.user)) {
    message.channel.send(suicide);
  }

  if (muted.includes(message.author.id)) return; //Check to see if you muted the bot (User side only)

  //Main aleart handler
  if (commonElements.length > 0) return message.author.send(suicide).catch(e => { message.channel.send(suicide) });
  Space.forEach((phrase, index) => {
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
  })
});



client.on('message', message => { //Message event listener

  //Pings for when somebody pings in a bot-heavy server.
  if (message.content === '!ping' || message.content === '?ping' || message.content === '.ping' || message.content === '$ping' || message.content === '%ping' || message.content === '-ping' || message.content === '--ping' || message.content === '=ping' || message.content === '+ping' ||message.content === '_ping'||message.content === '/ping'||message.content === '&ping'||message.content === '--ping'||message.content === "`ping") {
    message.channel.send('Pinging...').then((msg) => {
      const ping = new Discord.MessageEmbed()
        .setColor('#04d384')
        .setTitle('Pong!')
        .setDescription(`Roundtrip latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms \nAPI Latency is ${Math.round(client.ws.ping)}ms`)
        .addField('How do I add you to my server?', 'Go to https://spbot.ml/ and click on ADD BOT.')
      msg.edit(ping);
      msg.edit("\u200B");
    });
  }

  //Command handler: Return if not prefixed
  if (!message.content.startsWith(prefix)) return;
  const arguments = message.content.slice(prefix.length).trim().split(' ');
  const command = arguments.shift().toLowerCase();

  //Main Ping command
  if (['ping'].includes(command)) {
    message.channel.send('Pinging...').then((msg) => {
      const ping = new Discord.MessageEmbed()
        .setColor('#04d384')
        .setTitle('Pong!')
        .setDescription(`Roundtrip latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms \nAPI Latency is ${Math.round(client.ws.ping)}ms`)
        .addField('How do I add you to my server?', 'Go to https://spbot.ml/ and click on ADD BOT.')
      msg.edit(ping);
      msg.edit("\u200B");
    });

    //Help command
  } else if (['help'].includes(command)) {
    const help = new Discord.MessageEmbed()
      .setColor('#04d384')
      .setAuthor('Suicide Prevention Bot Help', 'https://spbot.ml/siround.png')
      .setTitle("What is this bot?")
      .setURL('https://spbot.ml')
      .setThumbnail('https://spbot.ml/siround.png')
      .setDescription('Hi! I’m a helpful bot dedicated to helping those who are at risk of suicide. I watch for key words and phrases, and then act accordingly to direct users to help. I respond with both phone and text lines specific to their country, so they can receive the best help possible. I’m 100% OPEN SOURCE and ANONYMOUS.')
      .addField('What do you respond to?', 'I look for key words related to suicide, as well as commands like !help, !invite, and !ping.')
      .addField('How do I add you to my server?', 'Go to https://spbot.ml/ and click on ADD BOT.')
      .addField('Are you anonymous?', 'Yes. I am, and have always been, 100% anonmyous. I\'m open source as well.')
      .addField('I have a bug report or feature request.', 'Join my Discord server (link at https://spbot.ml/)')
      .setImage('https://spbot.ml/sc2.png')
      .setFooter('Created by @Bobrobot1#1408 | https://spbot.ml | sp!mute to have the bot ignore your messages', 'https://spbot.ml/siround.png')
    message.channel.send(help);

    //Invite command
  } else if (['invites', 'invite'].includes(command)) {
    const invite = new Discord.MessageEmbed()
      .setColor('#04d384')
      .setTitle('Add a Suicide Prevention Bot')
      .setURL('https://spbot.ml/')
      .setDescription('This Discord bot is an easy-to-use and easy-to-install bot for Discord, that actively prevents suicide and other crisis from occuring. Add it to your Discord server in just 3 clicks.')
      .setImage('https://www.spbot.ml/suicideicon.png')
    message.channel.send(invite);

    //Mute command
  } else if (['ignore', 'mute'].includes(command)) {
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
