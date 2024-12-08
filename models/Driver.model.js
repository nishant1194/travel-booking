const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name:{
      type: String,
      required: true,
    },
    vehicleType: { type: String, enum: ["Cab", "Auto"], required: true },
    licenseNumber: {
      type: String,
      required: true,
    },
    govtId: {
      type: String,
    },

    availability: {
      type: Boolean,
      default: true,
    },
    totalRides: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Driver = mongoose.model("driver", driverSchema);

module.exports = Driver;
