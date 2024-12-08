const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    from:{
        type: String,
    },
    to:{
        type: String,
    },
    seatsBooked:{
        type: Number,
        default:0,
    },
    startTime: { type: Date },
    endTime: { type: Date },
    fare: { type: Number },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
    status: {
      type: String,
      enum: ["Upcoming","Ongoing", "Completed", "Cancelled"],
      default: "Ongoing",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Ride = mongoose.model("ride", rideSchema);

module.exports = Ride;
