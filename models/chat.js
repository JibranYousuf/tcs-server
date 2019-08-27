"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require("mongoose");
var chatSchema = new mongoose.Schema({
  msg: String,
  name: String,
  id: String
});
var chat = mongoose.model('chat', chatSchema);
exports.default = chat;
//# sourceMappingURL=course.js.map