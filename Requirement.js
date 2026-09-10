const mongoose = require("mongoose");

const requirementSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  cropName: {
    type: String,
    required: true
  },

  quantity: {
    type: Number,
    required: true
  },

  expectedPrice: {
    type: Number,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Requirement", requirementSchema);