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

var base_1 = require("./base");
var event_1 = require("../models/event");
var user_1 = require("../models/user");
var eventCtrl = /** @class */ (function (_super) {
    __extends(eventCtrl, _super);

    function eventCtrl() {

        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = event_1.default;
        _this.userModel = user_1.default;


        _this.insert = function (req, res) {
            var obj = new _this.model(req.body);
            obj.save(function (err, item) {
                // 11000 is the code for duplicate key error
                if (err && err.code === 11000) {
                    res.sendStatus(400);
                }
                if (err) {
                    return console.error(err);
                }
                _this.userModel.update({
                    _id: req.params.id
                }, {
                        $push: {
                            events: item._id
                        }
                    }, function (err) {
                        if (err) {
                            res.sendStatus(400)
                        }
                        res.sendStatus(200);
                    });
            });
        }

        _this.get = function (req, res) {
            _this.model.findOne({ _id: req.params.id }).
            populate({
                path: 'activities',
                model: 'activity'
            }).
            exec(function (err, docs) {
                if (!docs) {
                    return res.status(500).json('Event Not Found');
                }
                else{
                res.status(200).send(docs)
            }
            });
        };    

        _this.confirmPay = function (req, res) {
            _this.model.update({
                _id: req.params.id
            }, {
                    $set: {
                        isPaid: true
                    },
                }, function (err) {
                    if (err) {
                        res.status(500).json("Something Went Wrong")
                    }
                    res.sendStatus(200);
                });
        }
        _this.processPay = function (req, res) {
            var stripe = require("stripe")('sk_test_kXLKkg9RIbAMuiDklNvE3FXb');
            const token = req.body.stripeToken;
            var amountpayable = req.body.amount;
            const charge = stripe.charges.create({
                amount: amountpayable,
                currency: 'USD',
                description: 'Sample Transaction',
                source: token.id
            }, function (err, charge) {
                if (err)
                    console.log(err);
                else
                    res.sendStatus(200);
            }
            )
        };
        return _this;
    }

    return eventCtrl;
}(base_1.default));
exports.default = eventCtrl;
//# sourceMappingURL=event.js.map