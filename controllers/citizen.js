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
var citizen_1 = require("../models/citizen");
var base_1 = require("./base");
var citizenCtrl = /** @class */ (function (_super) {
    __extends(citizenCtrl, _super);

    function citizenCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = citizen_1.default;
        this.get = function (req, res) {
            _this.model.find({ _id: req.params.id }).
            populate({
                path: 'challans',
                model: 'challan'
            }).
            exec(function (err, docs) {
                if (err) {
                    return console.error(err);
                }
                res.status(200).json(docs);
            });
        };
    
        return _this;
    }
    return citizenCtrl;
}(base_1.default));
exports.default = citizenCtrl;
//# sourceMappingURL=citizen.js.map