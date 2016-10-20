var express = require('express');
var app = express();
var mongoose = require('mongoose');
var unirest = require('unirest');

var GoogleStrategy = require('passport-google-oauth20').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

var passport = require("passport");
var bodyParser = require("body-parser");

var User = require('./server/models/user');

var config = require('./config');

var db = 'mongodb://localhost:27017/mtb-trails';

mongoose.connect(db);
app.use(passport.initialize());
app.use('/', express.static('build'));
app.use(bodyParser.json());


// passport.use(new GoogleStrategy({
//   clientID: config.googleAuth.clientID,
//   clientSecret: config.googleAuth.clientSecret,
//   callbackURL: config.googleAuth.callbackURL,
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.find({
//       'googleID': profile.id
//     }, function(err, users) {
//       if (!users.length) {
//         User.create({
//           googleID: profile.id,
//           accessToken: accessToken,
//           favorites: [],
//           fullName: profile.displayName
//         }, function(err, users) {
//           return done(err, users[0]);
//         });
//       } else {
//         return done(err, users);
//       }
//     });
// }));

passport.use(new GoogleStrategy({
  clientID: config.googleAuth.clientID,
  clientSecret: config.googleAuth.clientSecret,
  callbackURL: config.googleAuth.callbackURL,
  },
  function(accessToken, refreshToken, profile, done) {
    User.find({googleID: profile.id}, function(err, user) {
      if (!user.length) {
        User.create({
          googleID: profile.id,
          accessToken: accessToken,
          favorites: [],
          fullName: profile.displayName
        }, function(err, users) {
          return done(err, user);
        });
      } else {
        return done(err, user);
      }
    });
}));

passport.use(new BearerStrategy(
  function(token, done) {
  User.find({ accessToken: token },
    function(err, users) {
      if(err) {
          return done(err)
      }
      if(!users) {
          return done(null, false)
      }
      return done(null, users, { scope: 'read' })
    }
  );
}
));

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile']
  }));

// app.get('/auth/google/callback',
//   passport.authenticate('google', {
//     failureRedirect: '/',
//     session: false
//   }),
//   function(req, res) {
//     res.cookie("accessToken", req.user[0].accessToken, {expires: 0});
//     res.redirect('/#/trails');
//   }
// );

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false
  }),
  function(req, res) {
    res.cookie('accessToken', req.user.accessToken, {expires: 0});
    res.redirect('/#/trails');
  }
);

app.get('/user', passport.authenticate('bearer', {session: false}), function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      res.send("Error has occured")
    } else {
      res.json(users);
    }
  });
});

// passport.use(new GoogleStrategy({
//   clientID: config.googleAuth.clientID,
//   clientSecret: config.googleAuth.clientSecret,
//   callbackURL: config.googleAuth.callbackURL,
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.find({googleID: profile.id}, function(err, user) {
//       if (!user.length) {
//         User.create({
//           googleID: profile.id,
//           accessToken: accessToken,
//           favorites: [],
//           fullName: profile.displayName
//         }, function(err, users) {
//           return done(err, user);
//         });
//       } else {
//         return done(err, user);
//       }
//     });
// }));


// add to favorites
app.put('/user/:googleID', passport.authenticate('bearer', {session: false}),
  function(req, res) {
    console.log('Add Favorite Hit the Server!');
    User.update({'googleID': req.params.googleID}, {'$push' : {'favorites': req.body.favorites}},
      function(err, user) {
        if(err) {
          return res.send(err)
        }
        return res.send({message: "Favorite added!"});
      });
    // console.log("body", req.body);
  });

// remove from favorites
app.put('/user/favorites/:trail_id', passport.authenticate('bearer', {session: false}),
  function(req, res) {
    console.log('Remove Favorite Hit the Server!');
    console.log('req.body.googleID', req.body.googleID);
    console.log('req.params.trail_id', req.params.trail_id);
    var trailID = parseInt(req.params.trail_id);
    var googleID = req.body.googleID;
    console.log('QUERY INFO', trailID, googleID);
    User.update( { 'favorites.trail_id':trailID, 'googleID':googleID }, 
                  { $pull : { 'favorites':{ 'trail_id':trailID } } },
                  { new: true },
      function(err, user) {
        if(err) {
          return res.send(err)
        }
        return res.send({message: "Favorite removed!"});
      });
  });

// get API data for trails
app.get('/trails/:city/:state', function(req, res) {
  var city = req.params.city;
  var state = req.params.state;
  unirest.get('https://trailapi-trailapi.p.mashape.com/?q[activities_activity_type_name_eq]=mountain+biking&q[city_cont]=' + city + '&q[state_cont]=' + state + '&radius=50')
  .header('X-Mashape-Key', 'Njf9yX0QmImshN5LtDdUS9MQcM68p1BVQxqjsna4e89QJjc3NI')
  .header('Accept', 'text/plain')
  .end(function (result) {
    // res.redirect('/#/trails/list');
    return res.send(result.body);
  });
});


app.listen(8080, function() {
  console.log('Listening at 8080!');
});