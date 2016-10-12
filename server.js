// Include Server Dependencies
var express       = require('express');
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var logger        = require('morgan');
var mongoose      = require('mongoose');
var request       = require('request');
var cheerio       = require('cheerio');
var passport      = require('passport');
var path          = require('path');
var session       = require('express-session');
var favicon       = require('favicon');

//Require User Schema
var User              = require('./models/user.js');
var Stats_NBA_Player   = require('./models/stats_NBA-Player.js');
var Stats_MLB_Batting  = require('./models/stats_MLB-Batting.js');
var Stats_MLB_Pitching = require('./models/stats_MLB-Pitching.js');
var Stats_NFL_Team     = require('./models/stats_NFL-Team.js');

// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000; // Sets an initial port. We'll use this later in our listener

require('./config/passport')(app, passport);

// Run Morgan for Logging
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret: "stattystatstatcat"+ new Date(),
    resave: true,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

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
  res.sendFile('public/index.html', { root: __dirname});
})

// =========== ROUTES ============
// Get basic info from Google Profile
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect : '/users/:id',
        failureRedirect : '/'
    }));

// User Homepage
app.get('/users/:id', isLoggedIn, function(req,res) {
  User.findOne({'id': User._id})
    .exec(function (err, doc) {
      if (err) {
        res.send(err);
      }
      else {
        console.log("Got'em");
        res.sendFile('app/components/children/userProfile');
      }
    })
})

app.get("/authorize", function(req, res){
  res.header('Access-Control-Allow-Credentials', true);
  if (req.isAuthenticated()){
    return res.json({isAuthorized: true});
  }
  return res.json({isAuthorized: false});
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}

// GET to Scrape website
app.get('/users/:id', function(req, res) {
// Use a request to grab the body of the HTML
// NBA Player Scrape
  request('http://www.basketball-reference.com/leagues/NBA_2016_advanced.html',
    function(error, response, html) {
     // console.log(html)
// Take body of HTML and load into Cheerio and save it to $ as a Selector
    var $ = cheerio.load(html);
    var Stats_NBA = mongoose.model( 'Stats_NBA_Player' );
    //console.log(Stats_NFL);
    // Clear existing documents from Collection
    Stats_NBA.find({}).remove(function(err, res) {
      console.log(err, res);
    });
  //  console.log($(".row").text());
// // Grab every h2 within the article Tag and perform the function
    $('#advanced_stats .full_table').each(function(i, element) {
// // Save an Empty Result Object
      // playerRow = $(this).text().trim();
      // console.log($(this).text().trim());
      var result = {};
        console.log(result);
// Add & Save Text & HREF of every link to Result Object
      result.player = $(this).find("[data-stat='player']").text();
      result.position = $(this).find("[data-stat='pos']").text();
      result.age = $(this).find("[data-stat='age']").text();
      result.team = $(this).find("[data-stat='team_id']").text();
      result.games = $(this).find("[data-stat='g']").text();
      result.minsPlayed = $(this).find("[data-stat='mp']").text();
      result.perRtg = $(this).find("[data-stat='per']").text();
      result.trShtPct = $(this).find("[data-stat='ts_pct']").text();
      result.threePtAttRt = $(this).find("[data-stat='fg3a_per_fga_pct']").text();
      result.ftAttRt = $(this).find("[data-stat='fta_per_fga_pct']").text();
      result.offRebPct = $(this).find("[data-stat='orb_pct']").text();
      result.defRebPct = $(this).find("[data-stat='drb_pct']").text();
      result.totalRebPct = $(this).find("[data-stat='trb_pct']").text();
      result.asstPct = $(this).find("[data-stat='ast_pct']").text();
      result.stelPct = $(this).find("[data-stat='stl_pct']").text();
      result.blokPct = $(this).find("[data-stat='blk_pct']").text();
      result.trnOverPct = $(this).find("[data-stat='tov_pct']").text();
      result.usagePct = $(this).find("[data-stat='usg_pct']").text();
      result.offWinShare = $(this).find("[data-stat='ows']").text();
      result.defWinShare = $(this).find("[data-stat='dws']").text();
      result.totWinShare = $(this).find("[data-stat='ws']").text();
      result.p48WinShare = $(this).find("[data-stat='ws_per_48']").text();
      result.offPlusMinus = $(this).find("[data-stat='obpm']").text();
      result.defPlusMinus = $(this).find("[data-stat='dbpm']").text();
      result.boxPlusMinus = $(this).find("[data-stat='bpm']").text();
      result.vORP = $(this).find("[data-stat='vorp']").text();

// // Use Article Model to create a new Entry
      var entry = new Stats_NBA_Player(result);
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
    console.log("NBA Send Complete");
  });
// MLB Batting Scrape
  request('http://www.fangraphs.com/leaders.aspx?pos=all&stats=bat&lg=all&qual=y&type=1&season=2016&month=0&season1=2016&ind=0&team=0&rost=0&age=0&filter=&players=0&page=1_150',
    function(error, response, html) {
     //console.log(html)
// Take body of HTML and load into Cheerio and save it to $ as a Selector
    var $ = cheerio.load(html);
    var Stats_MLBBatting = mongoose.model( 'Stats_MLB_Batting' );
    //console.log(Stats_NFL);
    // Clear existing documents from Collection
    Stats_MLBBatting.find({}).remove(function(err, res) {
      console.log(err, res);
    });
  //  console.log($(".row").text());
// // Grab every h2 within the article Tag and perform the function
    $('#LeaderBoard1_dg1 .rgMasterTable tr.rgRow,.rgAltRow').each(function(i, element) {
// // Save an Empty Result Object
      // playerRow = $(this).text().trim();
      //console.log($(this).text().trim());
      var result = {};
        console.log(result);
// Add & Save Text & HREF of every link to Result Object
      result.rank = $(this).find("td:first-child").text().trim();
      result.name = $(this).find("td:nth-child(2)").text().trim();
      result.team = $(this).find("td:nth-child(3)").text().trim();
      result.plateApps = $(this).find("td:nth-child(4)").text().trim();
      result.bbPct = $(this).find("td:nth-child(5)").text().trim();
      result.kPct = $(this).find("td:nth-child(6)").text().trim().trim();
      result.bbPerK = $(this).find("td:nth-child(7)").text().trim();
      result.aVG = $(this).find("td:nth-child(8)").text().trim();
      result.oBP = $(this).find("td:nth-child(9)").text().trim();
      result.sLGPct = $(this).find("td:nth-child(10)").text().trim();
      result.oPS = $(this).find("td:nth-child(11)").text().trim();
      result.iSO = $(this).find("td:nth-child(12)").text().trim();
      result.sPd = $(this).find("td:nth-child(13)").text().trim();
      result.bABIP = $(this).find("td:nth-child(14)").text().trim();
      result.uBR = $(this).find("td:nth-child(15)").text().trim();
      result.wGDP = $(this).find("td:nth-child(16)").text().trim();
      result.wSB = $(this).find("td:nth-child(17)").text().trim();
      result.wRC = $(this).find("td:nth-child(18)").text().trim();
      result.wRAA = $(this).find("td:nth-child(19)").text().trim();
      result.wOBA = $(this).find("td:nth-child(20)").text().trim();
      result.wRCPlus = $(this).find("td:nth-child(21)").text().trim();
      // result.wAR = $(this).find("td:nth-child(22)").text().trim();

// // Use Article Model to create a new Entry
      var entry = new Stats_MLB_Batting(result);
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
    console.log("MLB-Batting Send Complete")
  });
// MLB Pitching Scrape
  request('http://www.fangraphs.com/leaders.aspx?pos=all&stats=pit&lg=all&qual=y&type=1&season=2016&month=0&season1=2016&ind=0&team=0&rost=0&age=0&filter=&players=0&page=1_100',
    function(error, response, html) {
     //console.log(html)
// Take body of HTML and load into Cheerio and save it to $ as a Selector
    var $ = cheerio.load(html);

    var Stats_MLBPitching = mongoose.model( 'Stats_MLB_Pitching' );
    //console.log(Stats_NFL);
    // Clear existing documents from Collection
    Stats_MLBPitching.find({}).remove(function(err, res) {
      console.log(err, res);
    });
  //  console.log($(".row").text());
// // Grab every h2 within the article Tag and perform the function
    $('#LeaderBoard1_dg1 .rgMasterTable tr.rgRow,.rgAltRow').each(function(i, element) {
// // Save an Empty Result Object
      // playerRow = $(this).text().trim();
      //console.log($(this).text().trim());
      var result = {};
        console.log(result);
// Add & Save Text & HREF of every link to Result Object
      result.rank = $(this).find("td:first-child").text().trim();
      result.name = $(this).find("td:nth-child(2)").text().trim();
      result.team = $(this).find("td:nth-child(3)").text().trim();
      result.kPer9 = $(this).find("td:nth-child(4)").text().trim();
      result.bbPer9 = $(this).find("td:nth-child(5)").text().trim();
      result.kToBB = $(this).find("td:nth-child(6)").text().trim();
      result.hrPer9 = $(this).find("td:nth-child(7)").text().trim().trim();
      result.kPct = $(this).find("td:nth-child(8)").text().trim();
      result.bbPct = $(this).find("td:nth-child(9)").text().trim();
      result.kBBPct = $(this).find("td:nth-child(10)").text().trim();
      result.aVGAg = $(this).find("td:nth-child(11)").text().trim();
      result.wHIP = $(this).find("td:nth-child(12)").text().trim();
      result.bABIP = $(this).find("td:nth-child(13)").text().trim();
      result.lOBPct = $(this).find("td:nth-child(14)").text().trim();
      result.eRAMinus = $(this).find("td:nth-child(15)").text().trim();
      result.fIPMinus = $(this).find("td:nth-child(16)").text().trim();
      result.xFIPMinus = $(this).find("td:nth-child(17)").text().trim();
      result.eRA = $(this).find("td:nth-child(18)").text().trim();
      result.fIP = $(this).find("td:nth-child(19)").text().trim();
      result.eToFIP = $(this).find("td:nth-child(20)").text().trim();
      result.xFIP = $(this).find("td:nth-child(21)").text().trim();
      result.sIERA = $(this).find("td:nth-child(22)").text().trim();
      // result.wAR = $(this).find("td:nth-child(22)").text().trim();

// // Use Article Model to create a new Entry
      var entry = new Stats_MLB_Pitching(result);
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
    console.log('MLB-Pitching Send complete');
  });
// NFL Scrape
  request('http://www.footballoutsiders.com/stats/teameff',
    function(error, response, html) {
     //console.log(html)
// Take body of HTML and load into Cheerio and save it to $ as a Selector
    var $ = cheerio.load(html);
    // Ref to Model defined in dependency
    var Stats_NFL = mongoose.model( 'Stats_NFL_Team' );
    //console.log(Stats_NFL);
    // Clear existing documents from Collection
    Stats_NFL.find({}).remove(function(err, res) {
      console.log(err, res);
    });
  //  console.log($(".row").text());
// // Grab every h2 within the article Tag and perform the function
    $('.content-body table:first-child tr').each(function(i, element) {
// // Save an Empty Result Object
      // playerRow = $(this).text().trim();
      //console.log($(this).text().trim());
      var result = {};
        //console.log(result);
// Add & Save Text & HREF of every link to Result Object
      result.rank = $(this).find("td:first-child").text().trim();
      result.teamName = $(this).find("td:nth-child(2)").text().trim();
      result.totDVOA = $(this).find("td:nth-child(3)").text().trim();
      result.lastWkRkg = $(this).find("td:nth-child(4)").text();
      result.totDAVE = $(this).find("td:nth-child(5)").text();
      result.dAVERank = $(this).find("td:nth-child(6)").text();
      result.record = $(this).find("td:nth-child(7)").text().trim();
      result.offDVOA = $(this).find("td:nth-child(8)").text().trim();
      result.offRank = $(this).find("td:nth-child(9)").text().trim();
      result.defDVOA = $(this).find("td:nth-child(10)").text().trim();
      result.defRank = $(this).find("td:nth-child(11)").text().trim();
      result.specTeamDVOA = $(this).find("td:nth-child(12)").text().trim();
      result.specTeamRank = $(this).find("td:nth-child(13)").text().trim();

// // Use NFL-Team Model to create a new Entry
      var entry = new Stats_NFL_Team(result);
      console.log(result);

      entry.save(function(err, doc) {
        if (err) {
          console.log(err);
        }
        else {
          console.log(doc);
        }
      })
    });
  });
// Notification that the Scrape is finished
  console.log('NFL Send complete');
});

// GET stats scraped from mongoDB
app.get('/StatsNBAPlayer',isLoggedIn, function(req, res) {
  Stats_NBA_Player.find({}, function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(doc);
    }
  });
});
// GET stats scraped from mongoDB
app.get('/StatsMLBBatting',isLoggedIn, function(req, res) {
  Stats_MLB_Batting.find({}, function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(doc);
    }
  });
});
// GET stats scraped from mongoDB
app.get('/StatsMLBPitching',isLoggedIn, function(req, res) {
  Stats_MLB_Pitching.find({}, function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(doc);
    }
  });
});
// GET articles scraped from mongoDB
app.get('/StatsNFLTeams',isLoggedIn, function(req, res) {
  Stats_NFL_Team.find({}, function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(doc);
    }
  });
});
// Add New Users
app.post('/submit', function(req,res) {
  var user = new User(req.body);

  user.save(function(err,doc) {
    if (err) {
      res.send(err);
    }
    else {
      res.redirect('/users/:id');
    }
  });
});

// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
