// Include the Main React Dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var browserHistory = require('react-router').browserHistory;

// Include the Main Component
var Main = require('./Components/Main.js')



// This code here allows us to render our main component (in this case "Main")
ReactDOM.render(

  <Main />,
  document.getElementById('app')
)