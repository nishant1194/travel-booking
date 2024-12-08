const Payment = require('../models/Payment.model');
const Ride = require('../models/Rides.model');
const User = require('../models/User.model');

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('rideId', 'from to fare')
      .populate('userId', 'name email');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('rideId', 'from to fare')
      .populate('userId', 'name email');
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get payments for a specific user
exports.getPaymentsByUser = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.params.userId }).populate('rideId', 'from to fare');
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a payment
exports.createPayment = async (req, res) => {
  try {
    const { rideId, userId, amount, paymentMethod, transactionId } = req.body;

    // Check if ride exists
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    const payment = new Payment({
      rideId,
      userId,
      amount,
      paymentMethod,
      transactionId,
      paymentStatus: 'Completed', // Assume payment is successful by default
    });

    await payment.save();

    // Update ride payment status
    ride.paymentStatus = 'Paid';
    await ride.save();

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    payment.paymentStatus = paymentStatus;
    await payment.save();

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
