const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
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
  rating: { type: Number, required: true },
  comment: { type: String },
 
},
 { timestamps: true }
);

const Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;
