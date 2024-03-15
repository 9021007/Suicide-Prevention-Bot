# Translations

Welcome! Since the bot was rewritten from the ground up, translations have been reset. If you are looking to translate the bot into your own language, there are a few things that you should be aware:

- You do not need any programming experience to translate the bot.
- The language files are stored in the `locales` folder, and are named with the 2-letter language code, such as `en` for English, followed by `.json`.
- While the bot messages will be shown in the translated language, the bot has only been trained on English data, and will only be able to *detect* those needing help if they speak in English.
  - If you have a dataset in your language, let us know! It would be great to expand the bot's capabilities.
  - You can still ping the bot if you see someone in need, and it will respond in the translated language.
- To create a translation, copy the `en.json` file in the `locales` folder, and rename it to the 2-letter language code of your choice.
- On each line of the file, there should be 2 copies of each message. Delete the second copy, and replace it with the translated version.
- Any missing messages will default to English.
- Slash command names are not localized at this time.