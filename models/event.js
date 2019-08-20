"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var challanSchema = new mongoose.Schema({
  event_name: String,
  event_date_time: {
    type: Date,
    default: Date.now
  },
  event_type: String,
  event_duration: String,
  event_ground: String,
  event_address: String,
  event_activities: String,
  notification: String,
  alert : String,
  alarm : String,
  activities: [{ type: Schema.Types.ObjectId, ref: 'activity' }],
});
var event = mongoose.model('event', challanSchema);
exports.default = event;
//# sourceMappingURL=course.js.map