const fetch = require('node-fetch');
const SAD_TAYLOR = 'https://i.imgur.com/1FjXfu3.jpg';

if (process.env.NODE_ENV === 'development') require('dotenv').config();

getGifOrSticker = (type) => {
  const uri = encodeURI(
    `https://api.giphy.com/v1/${type}/search?q=taylor swift&api_key=${process.env.GIPHY_KEY}`
  );

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(uri)
        .then((res) => res.json())
        .catch((err) => {
          console.log(err);
          reject(SAD_TAYLOR);
        });
      const items = response.data;
      const randomItem = items[Math.floor(Math.random() * items.length)];
      if (randomItem) {
        resolve(randomItem.embed_url);
      }
    } catch (err) {
      console.log(err);
      reject(SAD_TAYLOR);
    }
  });
};

module.exports = getGifOrSticker;
