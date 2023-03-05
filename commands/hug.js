module.exports = {
  command: {
    name: "hug",
    description: "Hug the bot",
    options: []
  },
  default: async (interaction, lang) => {
    interaction.reply('You get a warm hug');
  }
};