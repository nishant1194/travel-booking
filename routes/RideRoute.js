const express = require('express');
const router = express.Router();
const {getRideById, getRidesByDriver , getAllRides , createRide , updateRide , deleteRide, getActiveRides} = require('../controllers/Ride.controller.js');

// Get all rides
router.get('/all-rides', getAllRides);
router.get('/', getActiveRides);

// Get a ride by ID
router.get('/:id', getRideById);

// Create a new ride
router.post('/', createRide);

// Update a ride
router.put('/:id', updateRide);

// Delete a ride
router.delete('/:id', deleteRide);

// Get all rides by a specific driver
router.get('/driver/:driverId', getRidesByDriver);

module.exports = router;
