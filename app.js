const Discord = require('discord.js');
const client = new Discord.Client();

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const getGifOrSticker = require('./giphy');
const getLyrics = require('./lyrics')
const getQuote = require('./quote')


client.once('ready', () => {
  console.log('Taylor Bot Connected :)');
});

client.on('message', message => {
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

    const commandType = args[0];

    switch (commandType) {
      case 'gif':
        if (args.length === 1) {
          getGifOrSticker('gifs')
            .then(item => message.channel.send(item))
            .catch(errorImgLink => {
              message.channel.send("Couldn't get gif from Giphy :(");
              message.channel.send(errorImgLink);
            });
        } else {
          getGifOrSticker('gifs', args.slice(1).join(' '))
            .then(item => message.channel.send(item))
            .catch(errorImgLink => {
              message.channel.send("Couldn't get gif from Giphy :(");
              message.channel.send(errorImgLink);
            });
        }
        break;
      case 'sticker':
        getGifOrSticker('stickers')
          .then(item => message.channel.send(item))
          .catch(errorImgLink => {
            message.channel.send("Couldn't get gif from Giphy :(");
            message.channel.send(errorImgLink);
          });
        break;
      case 'lyrics':
        const searchTerm = args.slice(1).join(' ');
        if (!searchTerm) message.channel.send('Oopsie, you forgot the song name');
        getLyrics(searchTerm)
          .then(lyrics => message.channel.send(lyrics))
          .catch(() =>
            message.channel.send(`I failed to get lyrics for "${searchTerm}"`)
          );
        break;
      case 'quote':
        getQuote()
          .then(quote => message.channel.send(quote))
          .catch(() => message.channel.send('I failed to get quote for'));
        break;
      case 'fastgif':
        getGifOrSticker('gifs', 'the fast and the furious')
          .then(item => message.channel.send(item))
          .catch(errorImgLink => {
            message.channel.send("Couldn't get gif from Giphy :(");
            message.channel.send(errorImgLink);
          });
        break;
      default:
        break;
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
