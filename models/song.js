const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let SongSchema = new Schema({
    name: {type: String, required: true, maxlength:100, minlength: 3},
    created_at: {type: Date},
    updated_at: {type: Date}
})

SongSchema.virtual('url').get(function (){
    return 'song/'+this._id;
});

module.exports = mongoose.model('Song', SongSchema);