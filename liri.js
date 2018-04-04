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

    // Both are undefined right now - why?
    console.log(spotify.id)
    console.log(client.consumer_key)

    // Take the first word of the player input to determine the action
    let action = process.argv[2];

    // Empty array to take in user input, and variable for formatted user input
    var userInputArray = [];
    var userInput;

    for (var i = 3; i < process.argv.length; i++) {
        userInputArray.push(process.argv[i])
    }

    // Formats the user input
    userInput = userInputArray.join(" ")


    switch (action) {
        case "my-tweets":
        case "spotify-this-song":
        case "movie-this":
            request("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy") // What if plot isn't short, and what is y=?
                .then(response => {
                    let data = JSON.parse(response);
                    console.log(`
        Title: ${data.Title}
        Year: ${data.Year}
        IMDB Rating: ${data.Ratings[0].Value}
        RT Rating: ${data.Ratings[1].Value}
        Country: ${data.Country}
        Language(s): ${data.Language}
        Plot: ${data.Plot}
        Actors: ${data.Actors}
        `)
                })
        case "do-what-it-says":
    }


})();