// app/children/userProfile

// Include React
var React = require('react');

// Component creation
var userProfile = React.createClass({
    getInitialState: function(){
    return {

      isLoggedIn: true,
      statResultsNBA: "",
      statResultsMLBBatting: "",
      statResultsMLBPitching: "",
      statResultsNFLTeams: "",

    }
  },

  componentWillMount: function(){
   // Get Player stats as JSON
    helpers.getStatsNBA()
      .then(function(response) {
        // console.log("Stats", response.data);

        this.setState({
          statResultsNBA: response.data,
          limit: 10,
        })
      }.bind(this))
  },
  componentWillMount: function(){
    helpers.getStatsMLBBatting()
      .then(function(response) {
        // console.log("Stats", response.data);

        this.setState({
          statResultsMLBBatting: response.data,
          limit: 10,
        })
      }.bind(this))
  },
  componentWillMount: function(){
    helpers.getStatsMLBPitching()
      .then(function(response) {
        // console.log("Stats", response.data);

        this.setState({
          statResultsMLBPitching: response.data,
          limit: 10,
        })
      }.bind(this))
  },
  componentWillMount: function(){
    helpers.getStatsNFLTeams()
      .then(function(response) {
        // console.log("Stats", response.data);

        this.setState({
          statResultsNFLTeams: response.data,
          limit: 10,
        })
      }.bind(this))
  },

  render: function() {
    console.log("rendered")

    var myStatsNBA    = null;
    var myStatsMLBBat = null;
    var myStatsNFL    = null;

    // Login authentication here
    if (this.state.loggedIn) {
      //console.log("function ran")
      myStatsNBA = this.state.statResultsNBA.map(function(data, index){
        return <div key={index} id="played" className="short">
          <div className="games">
            <span> { data.player } </span>
            <span> { data.totWinShare } </span>
            <span> { data.boxPlusMinus } </span>
            <span> { data.vORP } </span>
          </div>
        </div>
      })
      myStatsMLBBat = this.state.statResultsMLBBatting.map(function(data, index){
        return <div key={index} id="played" className="short">
          <div className="games">
            <span> { data.name } </span>
            <span> { data.wRAA } </span>
            <span> { data.wOBA } </span>
            <span> { data.wRCPlus } </span>
          </div>
        </div>
      })
      myStatsNFL = this.state.statResultsNFLTeams.map(function(data, index){
        return <div key={index} id="played" className="short">
          <div className="games">
            <span> { data.teamName } </span>
            <span> { data.totDAVE } </span>
            <span> { data.offDVOA } </span>
            <span> { data.defDVOA } </span>
          </div>
        </div>
      })
    }
    return(
        <div id="team-container">
          <div id="games-container">
              { myStatsNFL }
              { myStatsNBA }
              { myStatsMLBBat }
          </div>
        </div>
      )
  }
});

// Export the component back for use in other files
module.exports = userProfile;