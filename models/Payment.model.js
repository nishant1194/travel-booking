const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    rideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ride",
      required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },  
    amount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["CreditCard", "DebitCard", "UPI", "NetBanking", "Cash"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
    transactionDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Payment = mongoose.model("payment", paymentSchema);

module.exports = Payment;
