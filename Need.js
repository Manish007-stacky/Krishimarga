const mongoose = require("mongoose");

const needSchema = new mongoose.Schema(
  {
    /* ================= BUYER REFERENCE ================= */

    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    /* ================= REQUIREMENT DETAILS ================= */

    cropName: {
      type: String,
      required: true,
      trim: true
    },

    quantity: {
      type: Number,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    /* ================= STATUS ================= */

    status: {
      type: String,
      enum: ["need", "fulfilled"],
      default: "need"
    },

    /* ================= READY FARMERS LIST ================= */
    /* Multiple farmers can respond */

    readyFarmers: [
      {
        farmer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        readyAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    /* ================= SELECTED FARMER ================= */
    /* Buyer chooses one */

    selectedFarmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }

  },
  { timestamps: true }
);

/* ================= INDEX FOR SEARCH ================= */
needSchema.index({ cropName: 1 });
needSchema.index({ location: 1 });

module.exports = mongoose.model("Need", needSchema);