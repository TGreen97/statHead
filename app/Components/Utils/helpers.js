var axios = require('axios');

var helpers = {

  // This function hits our own server to retrieve the record of query results
  getStatsNBA: function(){

    return axios.get('/StatsNBAPlayer')
      .then(function(response){

        console.log(response);
        return response;
      });
  },

  getStatsMLBBatting: function(){

    return axios.get('/StatsMLBBatting')
      .then(function(response){

        console.log(response);
        return response;
      });
  },

  getStatsMLBPitching: function(){

    return axios.get('/StatsMLBBatting')
      .then(function(response){

        console.log(response);
        return response;
      });
  },

  getStatsNFLTeams: function(){

    return axios.get('/StatsNFLTeams')
      .then(function(response){

        console.log(response);
        return response;
      });
  },
  // This function posts new searches to our database.
  // postStats: function(results){

  //   return axios.post('/api', {results: results})
  //     .then(function(results){

  //       console.log("Posted to MongoDB");
  //       return(results);
  //     })
  // }

}


// We export the helpers function
module.exports = helpers;