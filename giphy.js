const fetch = require('node-fetch');
const SAD_TAYLOR = 'https://i.imgur.com/1FjXfu3.jpg';

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const HISTORY_LENGTH = 20;
const MAX_NUMBER_OF_GIF_RESULTS = 1000;

const gifHistory = [];
const stickerHistory = [];

getGifOrSticker = type => {
  const uri = encodeURI(
    `https://api.giphy.com/v1/${type}/search?q=taylor swift&limit=${MAX_NUMBER_OF_GIF_RESULTS}&api_key=${process.env.GIPHY_KEY}`
  );

  return new Promise((resolve, reject) => {
    fetch(uri)
      .then(res => {
        if (res) {
          return res.json();
        }
      })
      .then(json => {
        const items = json.data;
        while (true) {
          const randomItem =
            items[Math.floor(Math.random() * items.length)].embed_url;
          if (checkIfInHistory(type, randomItem)) {
            updateItemHistory(type, randomItem);
            resolve(randomItem);
            break;
          }
        }
      })
      .catch(err => {
        console.log(err);
        reject(SAD_TAYLOR);
      });
  });
};

function checkIfInHistory(type, item) {
  if (type === 'gifs') {
    // In history, need to search new
    if (gifHistory.indexOf(item) !== -1) {
      return false;
    }
    return true;
  } else if (type === 'stickers') {
    if (stickerHistory.indexOf(item) !== -1) {
      return false;
    }
    return true;
  }
}

function updateItemHistory(type, newItem) {
  if (type === 'gifs') {
    if (gifHistory.length <= HISTORY_LENGTH) {
      gifHistory.push(newItem);
    } else {
      gifHistory.shift();
      gifHistory.push(newItem);
    }
    console.log(gifHistory);
  } else if (type === 'stickers') {
    if (stickerHistory.length <= HISTORY_LENGTH) {
      stickerHistory.push(newItem);
    } else {
      stickerHistory.shift();
      stickerHistory.push(newItem);
    }
  }
}

module.exports = getGifOrSticker;
