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

app.get('/app', function(req, res) {
  User.find({})
    .exec(function(err, users) {
      if (err) {
        res.send("Error has occured")
      } else {
        res.json(users);
      }
    });
});

passport.use(new GoogleStrategy({
  clientID: config.googleAuth.clientID,
  clientSecret: config.googleAuth.clientSecret,
  callbackURL: config.googleAuth.callbackURL,
  },
  function(accessToken, refreshToken, profile, done) {
    User.find({
      'googleID': profile.id
    }, function(err, users) {
      if (!users.length) {
        User.create({
          googleID: profile.id,
          accessToken: accessToken,
          fullName: profile.displayName
        }, function(err, users) {
          return done(err, users[0]);
        });
      } else {
        return done(err, users);
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
      return done(null, users, { scope: ['read'] })
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

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failure',
    session: false
  }),
  function(req, res) {
    res.cookie("accessToken", req.user[0].accessToken, {expires: 0});
    res.redirect('/#/trails');
  }
);

app.get('/user', passport.authenticate('bearer', {session: false}), 
  function(req, res) {
    return res.send(req.user);
});

//TODO: finish implementing this function
app.put('/user/:googleID', passport.authenticate('bearer', {session: false}),
  function(req, res) {
  // console.log('req.body', req.body, req.body.user.id)
     //    User.findOneAndUpdate(
     //      { googleID: req.params.googleID, questions: {$elemMatch: {id:req.body.user.id}} },
     //      {
     //        $set: {correct: req.body.user.correct}
     //        // score: req.body.score

     //      },
     //    {
     //      'new': true
     //    },

     //     function(err, user) {
     //      if(err) {
     //        return res.send(err)
     //      }
     //      return res.send(user);
     // });

    User.update({"googleID": req.params.googleID}, {"$set" : {"favorites": req.body.score}},
      function(err, user) {
        if(err) {
          return res.send(err)
        }
        return res.send(user);

      });
    console.log("body", req.body);
  });


// get API data for trails
app.get('/trails', function(req, res) {
  unirest.get("https://trailapi-trailapi.p.mashape.com/?q[activities_activity_type_name_eq]=mountain+biking&q[city_cont]=Phoenix&q[state_cont]=Arizona&radius=25")
  .header("X-Mashape-Key", "Njf9yX0QmImshN5LtDdUS9MQcM68p1BVQxqjsna4e89QJjc3NI")
  .header("Accept", "text/plain")
  .end(function (result) {
    return res.send(result.body);
  })  
});



app.listen(8080, function() {
  console.log('Listening at 8080!');
});