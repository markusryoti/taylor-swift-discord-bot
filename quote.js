const fetch = require('node-fetch');
const API_URL = 'https://api.taylor.rest/';

const getQuote = () => {
  return new Promise((resolve, reject) => {
    fetch(API_URL)
      .then(res => res.json())
      .then(obj => resolve(obj.quote))
      .catch(err => reject(err));
  });
};

module.exports = getQuote;
