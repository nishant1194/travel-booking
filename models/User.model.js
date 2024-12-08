const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
   
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      isVerified: {
        type: Boolean,
        default: false,
      },
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
    },
    otp: {
      code: String,
      expiresAt: Date,
    },
    googleId: {
      type: String,
    },
    userType: {
      type: String,
      enum: ["user", "driver", "superAdmin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    profilePic: {
      type: String,
    },
    lastLogin: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
      select: false,
    },
    resetPasswordExpires: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
