"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require("mongoose");
var challanSchema = new mongoose.Schema({
  challanNo: String,
  challanType: String,
  challanDateCreated: {
    type: Date,
    default: Date.now
  },
  challanDatePaid: Date,
  isPaid: Boolean
});
var challan = mongoose.model('challan', challanSchema);
exports.default = challan;
//# sourceMappingURL=course.js.map