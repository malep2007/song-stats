const express = require('express');
const router = express.Router()

const learned_songs_controller = require('../controllers/learnedSong');

router.get('/', learned_songs_controller.learned_songs_get)
router.get('/add', learned_songs_controller.learned_song_add)
router.get('/statistic', learned_songs_controller.learned_song_statistic)

module.exports = router;