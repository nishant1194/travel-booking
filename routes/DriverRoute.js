const express = require('express');
const router = express.Router();
const {getDriverByUserId,getAllDrivers,getDriverById,createDriver,updateDriver,deleteDriver} = require('../controllers/Driver.controller.js');

// Get all drivers
router.get('/',getAllDrivers);

// Get a driver by ID
router.get('/:id',getDriverById);
router.get('/userId/:id',getDriverByUserId);

// Create a new driver
router.post('/',  createDriver);

// Update driver details
router.put('/:id',  updateDriver);

// Delete a driver
router.delete('/:id',  deleteDriver);

module.exports = router;
