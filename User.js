const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true,
    unique: true
  },

  role: {
    type: String,
    enum: ["farmer", "buyer", "admin"],
    required: true
  },

  password: {
    type: String,
    required: function () {
      return this.role === "admin";
    }
  },

  resetOtp: {
    type: Number
  },

  resetOtpExpire: {
    type: Date
  },

  profileImage: {
    type: String,
    default: ""
  },

  address: {
    type: String,
    default: ""
  },

  location: {
    type: String,
    default: ""
  },

  govtId: {
    type: String
  },

  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification"
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre("save", async function () {
  if (!this.password) return;
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);