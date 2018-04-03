(function () {
    var Twitter = require('twitter');
    var Spotify = require('node-spotify-api');
    var request = require('request-promise');
    require("dotenv").config();

    // Import the keys.js file
    let keys = require('./keys.js')

    // Assign the keys.js content to variables
    var spotify = new Spotify(keys.spotify);
    var client = new Twitter(keys.twitter);

    // console.log("Spotify stuff: " + spotify);
    // console.log("Twitter stuff: " + client);


})();