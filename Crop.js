const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    cropName: {
      type: String,
      required: true,
      trim: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    place: {
      type: String,
      required: true,
      trim: true
    },

    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length > 0 && arr.length <= 5;
        },
        message: "Crop must have between 1 and 5 images"
      }
    },

    status: {
      type: String,
      enum: ["waiting", "sold"],
      default: "waiting"
    },

    interestedBuyers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    interestCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

cropSchema.index({ cropName: 1 });
cropSchema.index({ place: 1 });
cropSchema.index({ farmer: 1 });

module.exports = mongoose.model("Crop", cropSchema);