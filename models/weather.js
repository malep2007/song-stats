const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let WeatherSchema = new Schema({
    data: {type: Schema.Types.Mixed},
    created_at: { type: Schema.Types.Date }
})

WeatherSchema.virtual('url').get(function (){
    return 'weather/'+this._id;
});

module.exports = mongoose.model('Weather', WeatherSchema);