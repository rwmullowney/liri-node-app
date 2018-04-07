(function () {
    require("dotenv").config();
    var Twitter = require('twitter');
    var Spotify = require('node-spotify-api');
    var request = require('request-promise');

    // Import the keys.js file
    let keys = require('./keys.js')
    debugger;

    // Assign the keys.js content to variables
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
    var client = new Twitter(keys.twitter);

    // console.log(spotify)
    // console.log(spotify.credentials.id)
    // console.log(client.consumer_key)

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

    // If the user doesn't provide a specific song, it defaults to The Sign by Ace of Base
    if (action === "spotify-this-song" && userInputArray.length == 0){
            userInput = "The Sign Ace of Base"
        
    }


    switch (action) {
        case "my-tweets":

        case "spotify-this-song":
            spotify.search({
                type: 'track',
                query: userInput,
                limit: 1,
            }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log(`
                Artist(s): ${data.tracks.items[0].artists[0].name}
                Song title: ${data.tracks.items[0].name}
                Album: ${data.tracks.items[0].album.name}
                Preview link: ${data.tracks.items[0].preview_url}
                `)
                
            })
            break;

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
                break;

        case "do-what-it-says":
    }

})();