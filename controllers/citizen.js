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
            _this.model.findOne({ cnic: req.params.id }).
            populate({
                path: 'events',
                model: 'event'
            }).
            exec(function (err, docs) {
                if (!docs) {
                    return res.status(500).json('Citizen Not Found');
                }
                else{
                res.status(200).send(docs)
            }
            });
        };    
        return _this;
    }
    return citizenCtrl;
}(base_1.default));
exports.default = citizenCtrl;
//# sourceMappingURL=citizen.js.map