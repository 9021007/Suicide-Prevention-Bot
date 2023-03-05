module.exports = {
  command: {
    name: "kiss",
    description: "Kiss the bot",
    options: []
  },
  default: async (interaction, lang) => {
    interaction.reply('Mwah!  UwU');
  }
};