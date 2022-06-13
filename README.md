# Suicide-Prevention-Bot


IF YOU'RE HAVING ISSUES: Check our system status at <https://spbot.freshstatus.io>

A Discord bot to prevent suicide. It works by taking a list of phrases, and it compares it against every message sent in the server. if the message includes the words or phrases, it reacts with an informational embed that directs users to local hotlines.

[![CodeQL](https://github.com/Bobrobot1/Suicide-Prevention-Bot/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/Bobrobot1/Suicide-Prevention-Bot/actions/workflows/codeql-analysis.yml)

Don't forget to rename `config.json.example` to `config.json` and fill in the `token` and `devGuildId` in config

node.js v16 and above required. LTS version recommended.


![screenshot](https://spbot.ml/sc2.png)

## Translating
Importing the translation function in your code:
```js
const { __ } = require('../index.js');
```
Usage:
```js
// Outputs "you have been trolled" in language "language"​
var trolledText = ​__​(​"You have been trolled"​,​ ​language​​);
```

With parameters:
```js
// Outputs "You have been muted for 1w", replaces {{duration with the given parameter}}
var mutedText = ​__​(​"You have been muted for {{duration}}"​,​ ​language​​, { duration: "1w" });
```
### Adding languages
First, add a language to `config.json` (in the supportedLanguages list).
Then, launch the program, and a language file will be generated in `/locales`

### Editing language files
`locales/fr.json`
```json
{
	"Language successfully changed!": "Language changé avec succès!",
	"Word {{word}} has been added to the blacklist": "Le mot {{word}} à été ajouté a la liste des mots à ignorer"
}
```

## Adding slash commands

### Creating a new slash command
Create a js file with this template code:
```javascript
const { Constants } = require('discord.js');

module.exports = {
	command: {
		name: "greeting",
		description: "Sends a greeting to a user!",
		options: [
			{
				name: "name",
				description: "Name of the user",
				required: true,
				type: Constants.ApplicationCommandOptionTypes.STRING,
			}
		]
	},

	default: async (interaction, lang) => {
		// Main code for your slash command
		// Example:
		const { commandName, options } = interaction;
		interaction.reply(`Hello ${options.getString("name")}`);
	}
};
```
### Registering commands
To register the command, add it at the beginning of `index.js` (assuming your command's file name is `greeting.js`):
```js
// Registers commands
var commands = [
	require('./commands/dm').command,
	require("./commands/ping").command,
	// ...
	require("./commands/blacklist").command,
	require("./commands/privacy").command,
	require("./commands/greeting.js").command
];
```
### Linking it to a function
Add your function in `index.js` (line ~200):
```js
// ...
case "blacklist":
	return require("./commands/blacklist").default(interaction, lang);
case "tos":
	return require("./commands/tos").default(interaction, lang);
case "greeting":
	return require("./commands/greeting").default(interaction, lang);
```



## Todo
 - [ ] Add more supported languages
 - [ ] Tweak the suicide keyword detection algorithm to make it perform better (less false positives)
## Links
[Website](https://spbot.ml)

[Status Website](https://spbot.freshstatus.io)

[Terms of Service](https://spbot.ml/terms.txt)

[Privacy Policy](https://spbot.ml/privacy.txt)

## Socials
[Discord](https://discord.com/invite/YHvfUqVgWS)

[Github](https://github.com/Bobrobot1/Suicide-Prevention-Bot)

[Reddit](https://www.reddit.com/r/SuicidePreventionBot)