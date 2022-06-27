const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LearnedSongSchema = new Schema({
    song: {type: Schema.Types.ObjectId, ref: 'Song', required: true},
    weather: {type: Schema.Types.Mixed},
    created_at: {type: Date},
    updated_at: {type: Date}
})

LearnedSongSchema.virtual('url').get(function(){
    return '/song/learned/' + this._id;
});

module.exports = mongoose.model('LearnedSong', LearnedSongSchema);