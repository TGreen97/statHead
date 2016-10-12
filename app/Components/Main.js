// Include React
var React = require('react');
var axios = require('axios');
var Link  = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

// Here we include all of the sub-components
// var Banner = require('./Children/banner.js');
// var Results = require('./Children/Results');
// var History = require('./Children/History');

// Helper Function
var helpers = require('./Utils/helpers.js');

// This is the main component.
var Main = React.createClass({

  getInitialState: function(){
    return {
      // searchTerm: "",
      isLoggedIn: false,
      statResultsNBA: "",
      statResultsMLBBatting: "",
      statResultsMLBPitching: "",
      statResultsNFLTeams: "",
      // history: [] /*Note how we added in this history state variable*/
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

  // The moment the page renders
  componentDidMount: function(){
    axios.get(window.location.origin + "/authorize", {withCredentials: true}).then(response => {
      if(!response.data.isAuthorized){
        browserHistory.push("/");
      }
      this.setState({loggedIn: response.data.isAuthorized});
    });
  },
  handleLogout: function(){
    var that = this;
    axios.get(window.location.origin + "/logout").then(response => {
      console.log("User has signed out.");
      this.setState({loggedIn: response.data.isAuthorized});
      browserHistory.push("/");
    });
  },

  // Here we render the function
  render: function(){
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
      <section>
       { this.state.loggedIn ?
          <Link to="/userProfile"></Link>
          :
          <a href="/auth/google"></a> }
{/*        <div className="header-global-wrapper">
         <header className="header-global">
           <div className="header-global-top">
             <h2 className="header-wrapper logo">
               <a href="/" className="header-global-logo-link">
                 <span className="site-logo">statHead.</span>
               </a>
             </h2>
             <a className="header-google" style={{width: 100 + 'px'}, {lineHeight: 27 + 'px'}} title="google-signOut" href={"/logout"} >Sign out</a> */}
            {/* //  onClick={signOut()} <script>
             //    signout = function {signOut()} {
             //      var auth2 = gapi.auth2.getAuthInstance();
             //      auth2.signOut().then(function () {
             //       console.log('User signed out.');
             //     });
             //   }
             //  </script>
            </div>
          </header>
        </div> */}

        <userProfile />
      </section>

    )
  }
});
    /*
<div className="row">
          <div className="jumbotron">
            <h2 className="text-center">Stats!</h2>
            <p className="text-center"><em>Lorem Ipsum. We gonna stat.</em></p>
          </div>

         <div id="stats" className="col-md-6">
            { statResults }
         </div>

           <div className="col-md-6">
             <Results stats={this.state.stats} />
           </div>
         </div>

        <div className="row">
          <History stats={this.state.stats}/>
        </div> */
// Export the component back for use in other files
module.exports = Main;