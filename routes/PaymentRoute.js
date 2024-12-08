const express = require('express');
const router = express.Router();
const {getAllPayments , getPaymentById , getPaymentsByUser ,createPayment , updatePaymentStatus, deletePayment} = require('../controllers/Payment.controller.js');

// Get all payments
router.get('/', getAllPayments);

// Get a payment by ID
router.get('/:id', getPaymentById);

// Get payments for a specific user
router.get('/user/:userId', getPaymentsByUser);

// Create a payment
router.post('/', createPayment);

// Update payment status
router.put('/:id', updatePaymentStatus);

// Delete a payment
router.delete('/:id', deletePayment);

module.exports = router;
