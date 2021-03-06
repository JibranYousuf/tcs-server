"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var citizenSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  cnic: {
    type: String,
  },
  password: {
    type: String,
  },
  userType: {
    type: String,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: String,
  },
  dob: {
    type: String,
  },
  contactnum: {
    type: String,
  },
  qualification: {
    type: String,
  },
  licenseNo: {
    type: String,
  },
  events: [{ type: Schema.Types.ObjectId, ref: 'event' }]
});
var citizen = mongoose.model('citizen', citizenSchema);
exports.default = citizen;