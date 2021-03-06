var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var UserSchema = mongoose.Schema({
        email:{
            type:String,
            lowercase:true,
            unique:true,
            required:true
        },
         password:{
             type:String,
             required:true
        },
        username:{
             type:String,
             required:true
        }
});

UserSchema.pre('save',function (next) {
    var user = this;
    if(this.isModified('password' || this.isNew)){
        bcrypt.genSalt(10,function (err,salt) {
            if(err){
                return next(err)
            }
            bcrypt.hash(user.password,salt,function (err,hash) {
                if(err){
                    return next(err)
                }
                user.password = hash;
                next();
            })
            
        })
    }
    else {
        return next();
    }
});
UserSchema.methods.comparePassword = function (password,callback) {
    bcrypt.compare(password,this.password,function (err,isMatch) {
        if(err){
            return callback(err)
        }
        callback(null,isMatch)

    })

}

module.exports = mongoose.model('User',UserSchema)
