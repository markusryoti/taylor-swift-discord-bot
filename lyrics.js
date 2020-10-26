const fetch = require('node-fetch');

if (process.env.NODE_ENV !== 'development') require('dotenv').config();

const { LYRICS_BASE_API, LYRICS_API_KEY } = process.env;

const getTrackId = async songTitle => {
  const encodedSong = encodeURI(songTitle);
  const response = await fetch(
    LYRICS_BASE_API +
      `track.search?q_artist=taylor%20swift&q_track=${encodedSong}&apikey=${LYRICS_API_KEY}`
  );
  const data = await response.json();
  // Assume its the first
  const trackObj = data.message.body.track_list[0];
  return trackObj.track.track_id;
};

const getLyricsByTrackId = async id => {
  const response = await fetch(
    LYRICS_BASE_API + `track.lyrics.get?track_id=${id}&apikey=${LYRICS_API_KEY}`
  );
  const data = await response.json();
  return data.message.body.lyrics.lyrics_body;
};

const getLyrics = async searchedTitle => {
  const id = await getTrackId(searchedTitle);
  const lyrics = await getLyricsByTrackId(id);
  return lyrics;
};

module.exports = getLyrics;
