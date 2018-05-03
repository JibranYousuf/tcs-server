"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var mongoose = require("mongoose");
var challanSchema = new mongoose.Schema({
    challanNo: String,
      challanType: String,
      challanDateCreated: { type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now},
      challanDatePaid:String,
      isPaid:Boolean
});
var challan = mongoose.model('challan', challanSchema);
exports.default = challan;
//# sourceMappingURL=course.js.map