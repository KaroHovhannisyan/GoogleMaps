

var express = require('express');
var userRouter = express.Router();

var config = require('../config/main');
var expressValidator = require('express-validator');
userRouter.use(expressValidator());
var passport = require('passport');

var jwt = require('jsonwebtoken');

var User = require('../models/user');

require('../config/passport')(passport);




userRouter.post('/register', function(req, res) {

    var username = req.body.username;
    var email = req.body.email;
    var password =  req.body.password;


    console.log(newUser);
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();


    var errors = req.validationErrors();

    if(errors) {
        var Err = errors.map(function (e) {
            return e.msg
        })
        res.status(400).send({err:Err});
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password,
            username:req.body.username

        });

        newUser.save(function(err) {
            if (err) {
                return res.status(400).send({err:err});
            }
            res.json({ success: true, message: 'Successfully created new user.' });
        });
    }
});




userRouter.get('/all',function (req,res) {
    User.find({},function(err,users){
        res.json(users);
    })

});


userRouter.post('/authenticate', function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send('User is not Found!');
        } else {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    const payload = {
                        email:user.email,
                        password:user.password
                    }
                    var token = jwt.sign(payload,config.secret);
                    res.json({ success: true, token:'JWT ' +token });
                } else {
                    res.status(500).send(' Password is wrong!');
                }
            });
        }
    });
});
userRouter.get('/dashboard',passport.authenticate('jwt',{session:false}),function (req,res) {
    res.send(req.user.username);

})

userRouter.get('/deleteAll',function (req,res) {
    User.find({}).remove().exec();
    res.end("deleted")
})
module.exports = userRouter
