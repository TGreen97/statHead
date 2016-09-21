var axios = require('axios');

var helpers = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(query){

    console.log(query);

    //Figure out the geolocation
    var queryURL = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20fantasysports.players.stats%20where%20league_key%3D'238.l.627060'%20and%20player_key%3D'238.p.6619'&format=json&diagnostics=true&callback=";

    return axios.get(queryURL)
      .then(function(response){

        console.log(response);
        return response.data.results[0].formatted;
    })

  },

  // This function hits our own server to retrieve the record of query results
  getStats: function(){

    return axios.get('/api')
      .then(function(response){

        console.log(response);
        return response;
      });
  },

  // This function posts new searches to our database.
  postStats: function(results){

    return axios.post('/api', {results: results})
      .then(function(results){

        console.log("Posted to MongoDB");
        return(results);
      })
  }

}


// We export the helpers function
module.exports = helpers;