const db = require('../db/dbConfig.js');

const getAllSongs = async () => {
  try {
    const allSongs = await db.any('SELECT * FROM songs');
    return allSongs;
  } catch (error) {
    return error;
  }
};

const getSongById = async id => {
  try {
    const song = await db.one('SELECT * FROM songs WHERE id = $1', id);
    return song;
  } catch (error) {
    return error;
  }
};

const createSong = async song => {
  const keys = Object.keys(song);
  const dbKeys = keys.filter(key => song[key]);
  const dbValues = dbKeys.map(key => '${' + key + '}').join(', ');
  try {
    const newSong = await db.one(
      `INSERT INTO songs (${dbKeys.join(', ')}) VALUES (${dbValues}) RETURNING *`,
      song
    );
    return newSong;
  } catch (error) {
    return error;
  }
};

module.exports = {getAllSongs, getSongById, createSong};
