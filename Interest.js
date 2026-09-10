const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema(
  {
    /* ================= REFERENCES ================= */

    crop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Crop",
      required: true
    },

    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    /* ================= STATUS ================= */

    status: {
      type: String,
      enum: ["interested", "accepted", "rejected"],
      default: "interested"
    },

    /* ================= RESPONSE MESSAGE ================= */

    farmerResponse: {
      type: String,
      default: ""
    }

  },
  { timestamps: true }
);


/* ============================================================
   🚫 PREVENT DUPLICATE INTEREST (ONE BUYER PER CROP)
============================================================ */
interestSchema.index({ crop: 1, buyer: 1 }, { unique: true });

/* ============================================================
   🔍 INDEXES FOR FASTER QUERIES
============================================================ */
interestSchema.index({ farmer: 1 });
interestSchema.index({ buyer: 1 });
interestSchema.index({ status: 1 });

module.exports = mongoose.model("Interest", interestSchema);