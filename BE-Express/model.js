const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  nickName: {
    type: String,
    default: "NO NAME",
    trim: true,
  },
  refCode: {
    type: String,
    default: "a",
    unique: true,
    trim: true,
  },
  inviteCode: {
    type: String,
    default: "a",
    trim: true,
  },
  tokenFromRef: {
    type: Number,
    default: 0,
  },
});

const hashSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const visitSchema = new mongoose.Schema({
  kolName: String,
  ipAddress: String,
  timestamp: Date,
});

const userModel = mongoose.model("User", userSchema);
const hashModel = mongoose.model("Hash", hashSchema);
const visitModel = mongoose.model("Visit", visitSchema);

module.exports = { userModel, hashModel, visitModel };
