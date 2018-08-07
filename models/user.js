"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        unique: true
    },
    cnic: {
        type: String,
        unique: true
    },
    password: {
    },
    contact: {
        type: String,
    },
    designation: {
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