const Vehicle = require('../models/Vehicle.model.js');
const Driver = require('../models/Driver.model.js');

// Get all vehicles
exports.getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate('driverId');
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a vehicle by ID
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate('driverId');
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new vehicle
exports.createVehicle = async (req, res) => {
  try {
    const { driverId, model, licensePlate, vehicleType, capacity  } = req.body;

    // const driver = await Driver.findById(driverId);
    // if (!driver) {
    //   return res.status(400).json({ message: 'Invalid driver ID' });
    // }

    const vehicle = new Vehicle({
      driverId,
      model,
      licensePlate,
      vehicleType,
      capacity,
     });

    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a vehicle
exports.updateVehicle = async (req, res) => {
  try {
    const { make, model, licensePlate, vehicleType, capacity, image } = req.body;
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    if (make) vehicle.make = make;
    if (model) vehicle.model = model;
    if (licensePlate) vehicle.licensePlate = licensePlate;
    if (vehicleType) vehicle.vehicleType = vehicleType;
    if (capacity) vehicle.capacity = capacity;
    if (image) vehicle.image = image;

    await vehicle.save();
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a vehicle
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
