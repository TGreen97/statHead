// Include React
var React = require('react');

// Here we include all of the sub-components
// var Form = require('./Children/Form');
// var Results = require('./Children/Results');
// var History = require('./Children/History');

// Helper Function
var helpers = require('./Utils/helpers.js');

// This is the main component.
var Main = React.createClass({
  // Get Articles as a JSON
  $.getJSON('/stats', function(data) {
    for (var i=0; i<data.length; i++) {
      $('#stats').append('<div class="well well-sm"> <p data-id="' + data[i]._id + '">'+ data[i].title + '<br />'+ data[i].link + '</p> </div>');
  }
});
  // Here we set a generic state associated with the number of clicks
  // getInitialState: function(){
  //   return {
  //     // searchTerm: "",
  //     results: "",
  //     // history: [] /*Note how we added in this history state variable*/
  //   }
  // },

  // This function allows childrens to update the parent.
  // setTerm: function(term){
  //   this.setState({
  //     searchTerm: term
  //   })
  // },

  // If the component changes (i.e. if a search is entered)...
  // componentDidUpdate: function(prevProps, prevState){

  //   if(prevState.searchTerm != this.state.searchTerm){
  //     console.log("UPDATED");

  //     // Run the query for the address
  //     helpers.runQuery(this.state.searchTerm)
  //       .then(function(data){
  //         if (data != this.state.results)
  //         {
  //           console.log("Address", data);

  //           this.setState({
  //             results: data
  //           })

  //           // After we've received the result... then post the search term to our history.
  //           helpers.postHistory(this.state.searchTerm)
  //             .then(function(data){
  //               console.log("Updated!");

  //               // After we've done the post... then get the updated history
  //               helpers.getHistory()
  //                 .then(function(response){
  //                   console.log("Current History", response.data);
  //                   if (response != this.state.history){
  //                     console.log ("History", response.data);

  //                     this.setState({
  //                       history: response.data
  //                     })
  //                   }
  //                 }.bind(this))
  //             }.bind(this)
  //           )
  //         }
  //       }.bind(this))

  //     }
  // },

  // The moment the page renders get the History
  componentDidMount: function(){

    // Get the latest stats.
    helpers.getStats()
      .then(function(response){
        if (response != this.state.stats){
          console.log ("Stats", response.data);

          this.setState({
            stats: response.data
          })
        }
      }.bind(this))
  },

  // Here we render the function
  render: function(){

    return(

      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">Stats!</h2>
            <p className="text-center"><em>Lorem Ipsum. We gonna stat.</em></p>
          </div>

        // <div id="stats" className="col-md-6">
            </div>

          <div className="col-md-6">
            <Results stats={this.state.stats} />
          </div>
        </div>

        <div className="row">
          <History stats={this.state.stats}/>
        </div>
      </div>
    )
  }
});

// Export the component back for use in other files
module.exports = Main;