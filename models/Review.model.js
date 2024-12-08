const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  rideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ride",
    required: true,
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  status1: {
    type: String,
     default: "Requested",
  },
  rating: { type: Number },
  comment: { type: String },
 
},
 { timestamps: true }
);

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
