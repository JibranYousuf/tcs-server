"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    first_name: {
        type: String
      },
      last_name: {
        type: String,
      },
      gender: {
        type: String,
      },
      dob: {
        type: String,
      },
      college_university: {
        type: String,
      },
      profession: {
        type: String,
      },
      email: {
        type: String,
      },
      contact_num: {
        type: String,
      },
      password: {
        type: String,
      },
});
// Before saving the user, hash the password
userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function (error, hash) {
            if (error) {
                return next(error);
            }
            user.password = hash;
            next();
        });
    });
});
userSchema.methods.comparePassword = function (candidatePassword, callback) {
    console.log(candidatePassword + '-----' + this.password);
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        console.log(isMatch);
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};
// Omit the password when returning a user
userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.password;
        return ret;
    }
});
var User = mongoose.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map