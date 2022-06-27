#! /usr/bin/env node

console.log('This script populates some test songs, to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Song = require('./models/song')


var mongoose = require('mongoose');
const song = require('./models/song');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var songs = []

function songCreate(name) {
  songdetail = { name:name }
  var song = new Song(songdetail);
       
  song.save(function (err) {
    if (err) {
      console.error(err)
      return
    }
    console.log('New Song: ' + song);
    songs.push(song)
  }  );
}


function createSongs(cb) {
    async.parallel([
        function(callback) {
          songCreate('As it Was', callback);
        },
        function(callback) {
            songCreate('First Class', callback);
        },
        function(callback) {
            songCreate('Wait for U', callback);
        },
        function(callback) {
            songCreate('About Damn Time', callback);
        },
        function(callback) {
            songCreate('Running Up That Hill', callback);
        },
        ],
        // optional callback
        cb);
}



async.series([
    createSongs,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('song instances: '+song);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



