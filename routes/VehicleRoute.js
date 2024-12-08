const express = require('express');
const router = express.Router();
const {getAllVehicles, getVehicleById ,createVehicle, updateVehicle ,deleteVehicle} = require('../controllers/Vehicle.controller.js');

// Get all vehicles
router.get('/', getAllVehicles);

// Get a vehicle by ID
router.get('/:id', getVehicleById);

// Create a new vehicle
router.post('/', createVehicle);

// Update a vehicle
router.put('/:id', updateVehicle);

// Delete a vehicle
router.delete('/:id', deleteVehicle);

module.exports = router;
