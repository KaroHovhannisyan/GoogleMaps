var FACEBOOK_APP_ID = '1504302036322928';
var FACEBOOK_APP__SECRET = '450442812b59fda09b2422d9280b1567';
var express = require('express');
var app = express();
var config = require('./config/main');
var cors = require('cors');
var mongoose = require('mongoose');
var port = 8888;
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var userRouter = require('./routes/user')
var ExpressValidaton = require('express-validator');
var FacebookStrategy = require('passport-facebook');

app.listen(port,function () {
    console.log('Listening...');
});

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
app.use(ExpressValidaton());

app.use(morgan('dev'))
mongoose.connect('mongodb://localhost/users');

app.use(passport.initialize());
app.use(cors());


app.get('/',function (req,res) {
    res.send('OK')

})

app.use('/user', userRouter)


//////////Facebook Authentification
app.route('/').get(
    passport.authenticate('facebook')

)

app.get('/auth/facebook/callback',passport.authenticate('facebook',function (err,user,info){
    console.log(err);
    console.log(user);
    console.log(info);
} ),function (req,res) {
    res.send('You Registered from Facebook')

});
var fbOpts = {
    clientID:FACEBOOK_APP_ID,
    clientSecret:FACEBOOK_APP__SECRET,
    callbackURL:'http://localhost:8888/auth/facebook/callback'
}

var fbCallback = function(acessToken,refreshToken,profile,cb) {
    console.log(acessToken,refreshToken,profile)

}
passport.use(new FacebookStrategy(fbOpts,fbCallback));


