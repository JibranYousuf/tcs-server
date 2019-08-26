"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require("mongoose");
var activitySchema = new mongoose.Schema({
  activity_name: String,
  activity_duration: String,
  activity_status: Boolean,
  activity_date: {
    type: Date
  }
});
var activity = mongoose.model('activity', activitySchema);
exports.default = activity;
//# sourceMappingURL=course.js.map