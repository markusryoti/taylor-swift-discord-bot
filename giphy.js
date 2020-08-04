const fetch = require('node-fetch');
const SAD_TAYLOR = 'https://i.imgur.com/1FjXfu3.jpg';

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

getGifOrSticker = (type) => {
  const uri = encodeURI(
    `https://api.giphy.com/v1/${type}/search?q=taylor swift&api_key=${process.env.GIPHY_KEY}`
  );

  return new Promise((resolve, reject) => {
    try {
      fetch(uri)
        .then((res) => {
          if (res) {
            return res.json();
          }
        })
        .then((json) => {
          const items = json.data;
          const randomItem = items[Math.floor(Math.random() * items.length)];
          if (randomItem) {
            resolve(randomItem.embed_url);
          }
          reject(SAD_TAYLOR);
        })
        .catch((err) => {
          console.log(err);
          reject(SAD_TAYLOR);
        });
    } catch (err) {
      console.log(err);
      reject(SAD_TAYLOR);
    }
  });
};

module.exports = getGifOrSticker;
