const express = require('express');
const router = express.Router()

const song_controller = require('../controllers/song')

router.get('/', song_controller.song_list)
router.post('/add', song_controller.song_create)

module.exports = router;