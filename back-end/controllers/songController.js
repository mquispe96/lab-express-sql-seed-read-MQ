const express = require('express');
const songs = express.Router();
const {getAllSongs, getSongById, createSong} = require('../queries/song.js');
const {requiredFields} = require('../validations/songValidations.js');

songs.get('/', async (req, res) => {
  const allSongs = await getAllSongs();
  if (allSongs[0]) {
    res.status(200).json(allSongs);
  } else {
    res.status(500).json({error: 'server error'});
  }
});

songs.get('/:id', async (req, res) => {
  const {id} = req.params;
  const song = await getSongById(id);
  if (song.id) {
    res.status(200).json(song);
  } else {
    res.status(404).json({error: 'song not found'});
  }
});

songs.post('/', requiredFields,async (req, res) => {
  const newSong = await createSong(req.body);
  if (newSong.id) {
    res.status(200).json(newSong);
  } else {
    res.status(500).json({error: 'server error'});
  }
});

module.exports = songs;
