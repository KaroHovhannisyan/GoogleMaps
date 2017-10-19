/**
 * Created by Karo on 11.10.2017.
 */
var JwStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var  config = require('./main');

var User = require('../models/user');

module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new JwStrategy(opts,function (jwt_payload,done) {
        User.findOne({email:jwt_payload.email},function (err,user) {
            if(err){
                return done(err,false)
            }
            if(user){
                done(null,user);
            }else {
                done(null,false)
                // new account
                console.log('new User')
            }
        })
    }))

}

