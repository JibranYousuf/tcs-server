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
var UserCtrl = /** @class */ (function (_super) {
    __extends(UserCtrl, _super);

    function UserCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = user_1.default;
        _this.login = function (req, res) {
            _this.model.findOne({
                cnic: req.body.cnic
            }, function (err, user) {
                if (!user) {
                    return res.status(404).json({success: false, msg: 'User Not Found'});
                }
                user.comparePassword(req.body.password, function (error, isMatch) {
                    if(err) throw err;
                    if (isMatch) {
                        var token = jwt.sign({
                            user: user
                        }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
                        res.status(200).json({
                            success: true,
                            token: token,
                            user: {
                                id: user._id,
                                name: user.name,
                                username: user.username,
                                email : user.email,
                                userType : user.userType,
                            }
                        });
                    }
                    else {
                        return res.status(401).json({success: false, msg: 'wrong password'});
                    }
                });
            });
        };
        return _this;
    }
    return UserCtrl;
}(base_1.default));
exports.default = UserCtrl;
//# sourceMappingURL=user.js.map