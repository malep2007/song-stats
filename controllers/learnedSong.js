const LearnedSong = require('../models/learnedSong');
const Weather = require('../models/weather')
const Song = require('../models/song')
const weather_controller = require('../controllers/weather')

exports.learned_songs_get = async function(req, res){
    const learned_songs = await LearnedSong.find();
    res.json(learned_songs)
};

exports.learned_song_add = async function(req, res){
    const song = req.body.song
    const weatherId = await weather_controller.get_weather_details(req, res)
    const learned_song = await LearnedSong.create({
        song: await Song.findOne({name: song.name}),
        weather: await Weather.findOne({where: {id: weatherId}}),
        created_at: Date.now()
    })
    return res.json(learned_song);
}

exports.learned_song_statistic = async function(req, res) {
    // get all the learned songs with the specified song id
    learned_songs_with_id = await LearnedSong.find({song: req.body.song_id})

    // create array for weather conditions
    let conditions = []

    learned_songs_with_id.forEach(song => {
        let {weather} = song
        //console.log(weather.data.weather[0].main)
        conditions.push(weather.data.weather[0].main)
    });

    console.log(conditions)

    //obtain object with count of occurrences for weather conditions
    const occurrences = conditions.reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
      }, {});
    
    // obtain sorted list of values 
    values = Object.values(occurrences)
    sum_of_occurrences = values.reduce((prev, curr) => prev + curr, 0)
    keys = Object.keys(occurrences)
    sum  = values.reduce((prev, curr) => prev + curr, 0)

    ranking = {}
    keys.forEach(item => {
        ranking[`${item}`] = (values[keys.indexOf(item)]/sum) * 100
    })

    return res.json(ranking)

    // top three occurences

}