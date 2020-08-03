const Discord = require('discord.js');
const client = new Discord.Client();

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const getGifOrSticker = require('./giphy');
const getLyrics = require('./lyrics');

client.once('ready', () => {
  console.log('Taylor Bot Connected :)');
});

client.on('message', (message) => {
  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot)
    return;

  const args = message.content
    .slice(process.env.PREFIX.length)
    .trim()
    .split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'taylor') {
    if (!args.length) {
      return message.channel.send(
        `You didn't provide any arguments, ${message.author}!`
      );
    }

    if (args[0] === 'gif') {
      getGifOrSticker('gifs')
        .then((item) => message.channel.send(item))
        .catch((errorImgLink) =>
          message.channel.send(
            "Couldn't get gif from Giphy :(\n" + errorImgLink
          )
        );
    } else if (args[0] === 'sticker') {
      getGifOrSticker('stickers')
        .then((item) => message.channel.send(item))
        .catch((errorImgLink) =>
          message.channel.send(
            "Couldn't get sticker from Giphy :(\n" + errorImgLink
          )
        );
    } else if (args[0] === 'lyrics') {
      const searchTerm = args.slice(1).join(' ');

      if (!searchTerm) message.channel.send('Oopsie, you forgot the song name');

      getLyrics(searchTerm)
        .then((lyrics) => message.channel.send(lyrics))
        .catch((_) =>
          message.channel.send(`I failed to get lyrics for "${searchTerm}"`)
        );
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
