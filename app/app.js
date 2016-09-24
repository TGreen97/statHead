// Include the Main React Dependencies
var React = require('react');
var ReactDOM = require('react-dom');

// Include the Main Component
var Main = require('./Components/Main')


$.getJSON('/StatsNBAPlayer', function(data) {
    for (var i=0; i<data.length; i++) {
      $('#stats').append('<div class="well well-sm"> <p data-id="' + data[i]._id + '">'+ data[i].player + '<br />'+ data[i].perRtg + '</p> </div>');
  }
});
// This code here allows us to render our main component (in this case "Main")
// ReactDOM.render(

//   <Main />,
//   document.getElementById('app')
// )