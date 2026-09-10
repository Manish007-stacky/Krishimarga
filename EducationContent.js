const mongoose = require("mongoose");

const educationContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Soil Health",
        "Organic Farming",
        "Machinery & Tools",
        "Govt Schemes",
        "Water Management",
        "Crop Insurance",
        "Seed Awareness",
        "Cattle and Poultry Farming",
      ],
    },
    type: {
      type: String,
      required: true,
      enum: ["video", "pdf", "image"],
    },
    sourceType: {
      type: String,
      required: true,
      enum: ["youtube", "upload"],
    },
    youtubeUrl: {
      type: String,
      default: "",
      trim: true,
    },
    fileUrl: {
      type: String,
      default: "",
      trim: true,
    },
    thumbnailUrl: {
      type: String,
      default: "",
      trim: true,
    },
    channelName: {
      type: String,
      default: "",
      trim: true,
    },
    duration: {
      type: String,
      default: "",
      trim: true,
    },
    views: {
      type: String,
      default: "",
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    uploadedBy: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EducationContent", educationContentSchema);