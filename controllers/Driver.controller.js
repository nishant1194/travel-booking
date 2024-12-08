const Driver = require('../models/Driver.model.js');
const User = require('../models/User.model.js');
const Vehicle = require('../models/Vehicle.model.js');

// Get all drivers
exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().populate('userId');
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDriverByUserId = async (req, res) => {
  try {
    const driver = await Driver.findById({d : req.body.id});
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get driver by ID
exports.getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById({_id : req.body.id}).populate('userId vehicleId');
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new driver
exports.createDriver = async (req, res) => {
  try {
    const { userId, licenseNumber ,vehicleType ,name} = req.body;
     const user = await User.findById(userId);
    // if (!user || user.userType !== 'driver') {
    //   return res.status(400).json({ message: 'Invalid user ID or user is not a driver' });
    // }
 
    const driver = new Driver({
      userId,
      licenseNumber,
      vehicleType,
      name
     });

    await driver.save();
    res.status(201).json(driver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update driver details
exports.updateDriver = async (req, res) => {
  try {
    const { licenseNumber, vehicleId, latitude, longitude, availability } = req.body;
    const driver = await Driver.findById(req.params.id);

    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    if (licenseNumber) driver.licenseNumber = licenseNumber;
    if (vehicleId) driver.vehicleId = vehicleId;
    if (latitude && longitude) {
      driver.currentLocation = { latitude, longitude };
    }
    if (availability !== undefined) driver.availability = availability;

    await driver.save();
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a driver
exports.deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json({ message: 'Driver deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
