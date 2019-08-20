"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({
            __proto__: []
        }
            instanceof Array && function (d, b) {
                d.__proto__ = b;
            }) ||
        function (d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p)) d[p] = b[p];
        };
    return function (d, b) {
        extendStatics(d, b);

        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", {
    value: true
});
var jwt = require("jsonwebtoken");
var user_1 = require("../models/user");
var base_1 = require("./base");
var event_1 = require("../models/event");
var UserCtrl = /** @class */ (function (_super) {
    __extends(UserCtrl, _super);

    function UserCtrl() {

        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = user_1.default;
        _this.eventModel = event_1.default;
        _this.model = user_1.default;
        _this.login = function (req, res) {
            _this.model.findOne({
                email: req.body.email
            }, function (err, user) {
                if (!user) {
                    return res.status(500).json('User Not Found');
                }
                user.comparePassword(req.body.password, function (error, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        var token = jwt.sign({ user: user }, process.env.SECRET_TOKEN, {
                            expiresIn: 604800  //1 week
                        });
                        res.status(200).json({
                            success: true,
                            token: token,
                            user: user
                        });
                    }
                    else {
                        return res.status(500).json('wrong password');
                    }
                });
            });
        };

        _this.get = function (req, res) {
            _this.model.findOne({ _id: req.params.id }).
                populate({
                    path: 'events',
                    model: 'event',
                    populate : {
                        path: 'activities',
                        model: 'activity',
                    }
                }).
                populate({
                    path: 'activities',
                    model: 'activity',
                }).
                exec(function (err, docs) {
                    if (!docs) {
                        return res.status(500).json('User Not Found');
                    }
                    else {
                        res.status(200).send(docs)
                    }
                });
           
        };

        _this.register = function (req, res) {
            let newUser = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                gender: req.body.gender,
                dob: req.body.dob,
                college_university: req.body.college_university,
                profession: req.body.profession,
                email: req.body.email,
                contact_num: req.body.contact_num,
                password: req.body.password
            });
            user.addUser(newUser, (err, user) => {
                if (err) {
                    res.status(400).json(
                        {
                            success: false, msg: 'failed to register user'
                        });
                }
                else {
                    res.status(200).json(
                        {
                            success: true, msg: 'User Registered'
                        });
                }
            });
        };
        return _this;
    }
    return UserCtrl;
}(base_1.default));
exports.default = UserCtrl;
//# sourceMappingURL=user.js.map