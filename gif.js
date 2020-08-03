const fetch = require('node-fetch');
const SAD_TAYLOR = 'https://i.imgur.com/1FjXfu3.jpg';

if (process.env.NODE_ENV === 'development') require('dotenv').config();

const getTaylorGif = () => {
  const uri = encodeURI(
    `https://api.giphy.com/v1/gifs/search?q=taylor swift&api_key=${process.env.GIPHY_KEY}`
  );

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(uri)
        .then((res) => res.json())
        .catch((err) => {
          console.log(err);
          reject(SAD_TAYLOR);
        });
      const gifs = response.data;
      const randomItem = gifs[Math.floor(Math.random() * gifs.length)];
      if (randomItem) {
        resolve(randomItem.embed_url);
      }
    } catch (err) {
      console.log(err);
      reject(SAD_TAYLOR);
    }
  });
};

module.exports = getTaylorGif;
