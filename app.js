var express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()


var app = express()

// configure mongoose connnection
var mongoose = require('mongoose');
var mongoDb  = "mongodb://localhost/songs_library"
mongoose.connect(mongoDb, {useNewUrlParser: true, useUNifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// Import routes
const weather_routes = require('./routes/weather')
const song_routes = require('./routes/song')
const learned_songs_routes = require('./routes/learnedSongs')

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/weather', weather_routes);
app.use('/song', song_routes);
app.use('/learnedsong', learned_songs_routes);

const port = 3001

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})