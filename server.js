// Include Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');
//Require Users Schema
var Users = require('./models/users.js');
var Stats = require('./models/stats.js');

// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000; // Sets an initial port. We'll use this later in our listener

// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect('mongodb://localhost/statHead');
var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Mongoose connection successful.');
});


// -------------------------------------------------

// Main Route. This route will redirect to our rendered React application
app.get('/', function(req, res){
  res.sendFile('./public/index.html');
})

// =========== ROUTES ============

// Index Route
// app.get('/', function(req, res) {
//   res.send(index.html);
// });

// GET to Scrape website
app.get('/scrape', function(req, res) {
// Use a request to grab the body of the HTML
  // request('https://www.reddit.com/r/sports/',
  request('http://www.basketball-reference.com/leagues/NBA_2016_advanced.html',
    function(error, response, html) {
     // console.log(html)
// Take body of HTML and load into Cheerio and save it to $ as a Selector
    var $ = cheerio.load(html);

  //  console.log($(".row").text());
// // Grab every h2 within the article Tag and perform the function
    $('td.left').each(function(i, element) {
// // Save an Empty Result Object
       var result = {};
        console.log(result);
// // Add & Save Text & HREF of every link to Result Object
      result.player = $(this).children('a').text();
      result.link = $(this).children('a').text();
// // Use Article Model to create a new Entry
      var entry = new Stats(result);
// // Save Article Object to Entry
      entry.save(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(doc);
        }
      });
    });
  });
// Notification that the Scrape is finished
  res.send('Send complete');
});

// GET articles scraped from mongoDB
app.get('/stats', function(req, res) {
  Stats.find({}, function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(doc);
    }
  });
});

// GET article by its ObjectID
// app.get('/articles/:id', function(req, res) {
// // Use the ID from the parameter and prepare a query that finds the matching one in the db
//   Article.findOne({'_id': req.params.id})
//   .populate('message')
//   .exec(function(err, doc) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       res.json(doc);
//     }
//   });
// });

// Replace an existing Message on an Article with a new one, and if no message exists for an Article, make the posted Message it's Message
// app.post('/articles/:id', function(req, res) {
//   var newMessage = new Message(req.body);

//   newMessage.save(function(err, doc) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       Article.findOneAndUpdate({'_id': req.params.id}, {'message':doc._id})
//       .exec(function(err, doc) {
//         if (err) {
//           console.log(err);
//         }
//         else {
//           res.send(doc);
//         }
//       });
//     }
//   });
// });

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
// app.get('/api/', function(req, res) {

//   // We will find all the records, sort it in descending order, then limit the records to 5
//   History.find({}).sort([['date', 'descending']]).limit(5)
//     .exec(function(err, doc){

//       if(err){
//         console.log(err);
//       }
//       else {
//         res.send(doc);
//       }
//     })
// });

// This is the route we will send POST requests to save each search.
// app.post('/api/', function(req, res){
//   var newSearch = new History(req.body);
//   console.log("BODY: " + req.body.location);

  // Here we'll save the location based on the JSON input.
  // We'll use Date.now() to always get the current date time
//   History.create({"location": req.body.location, "date": Date.now()}, function(err){
//     if(err){
//       console.log(err);
//     }
//     else {
//       res.send("Saved Search");
//     }
//   })
// });


// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
