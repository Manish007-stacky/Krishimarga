const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    requirement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Requirement",
      required: true,
      index: true
    },

    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    offeredPrice: {
      type: Number,
      required: true,
      min: 0
    },

    quantityAvailable: {
      type: Number,
      required: true,
      min: 1
    },

    message: {
      type: String,
      trim: true
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
    }
  },
  {
    timestamps: true // automatically adds createdAt & updatedAt
  }
);


/* ============================================================
   🔒 PREVENT DUPLICATE RESPONSE FROM SAME FARMER
============================================================ */
responseSchema.index(
  { requirement: 1, farmer: 1 },
  { unique: true }
);


/* ============================================================
   📦 EXPORT MODEL
============================================================ */
module.exports = mongoose.model("Response", responseSchema);