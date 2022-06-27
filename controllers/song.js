var Song = require('../models/song');

exports.song_list = async function(req, res){
    const songs = await Song.find()
    res.json(songs)
}

exports.song_create = async function(req, res){
    const song = await Song.create({
        name: req.body.name,
        created_at: Date.now()
    })
    res.json(song)
}