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
var challan_1 = require("../models/challan");
var citizen_1 = require("../models/citizen");

var challanCtrl = /** @class */ (function (_super) {
    __extends(challanCtrl, _super);

    function challanCtrl() {

        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = challan_1.default;
        _this.citizenModel = citizen_1.default;

        
        _this.insert = function(req,res){
            var obj = new _this.model(req.body);
                obj.save(function (err, item) {
                    // 11000 is the code for duplicate key error
                    if (err && err.code === 11000) {
                        res.sendStatus(400);
                    }
                    if (err) {
                        return console.error(err);
                    }
                    _this.citizenModel.update({
                            cnic: req.params.id
                    }, {
                        $push: {
                            challans: item._id
                        }
                    }, function (err) {
                        if (err) {
                            res.sendStatus(400)
                        }
                        res.sendStatus(200);
                    });
                });
        }
        return _this;
    }
    return challanCtrl;
}(base_1.default));
exports.default = challanCtrl;
//# sourceMappingURL=challan.js.map