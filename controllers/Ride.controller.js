const Ride = require('../models/Rides.model.js');
const Driver = require('../models/Driver.model.js');
const User = require('../models/User.model.js');

// Get all rides
exports.getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find().populate('driverId');
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getActiveRides = async (req, res) => {
  try {
    const currentTime = new Date(); // Get the current time
    const rides = await Ride.find({ startTime: { $gt: currentTime } }).populate('driverId');
    res.status(200).json(rides); // Send the retrieved rides as a response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
};



// Get a ride by ID
exports.getRideById = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id).populate('driverId');
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new ride
exports.createRide = async (req, res) => {
  try {
    const { driverId, from, to, startTime, endTime, fare, seatsBooked } = req.body;

    const driver = await User.findById(driverId);
    if (driver.userType != 'driver') {
      return res.status(400).json({ message: 'Invalid driver ID' });
    }
      const ride = new Ride({
      driverId,
      from,
      to,
      startTime,
      endTime,
      fare,
      seatsBooked,
    });

    await ride.save();
    res.status(201).json(ride);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a ride
exports.updateRide = async (req, res) => {
  try {
    const { from, to, seatsBooked, startTime, endTime, fare, status, paymentStatus } = req.body;

    const ride = await Ride.findById(req.params.id);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    if (from) ride.from = from;
    if (to) ride.to = to;
    if (seatsBooked !== undefined) ride.seatsBooked = seatsBooked;
    if (startTime) ride.startTime = startTime;
    if (endTime) ride.endTime = endTime;
    if (fare !== undefined) ride.fare = fare;
    if (status) ride.status = status;
    if (paymentStatus) ride.paymentStatus = paymentStatus;

    await ride.save();
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a ride
exports.deleteRide = async (req, res) => {
  try {
    const ride = await Ride.findByIdAndDelete(req.params.id);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    res.status(200).json({ message: 'Ride deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all rides by a specific driver
exports.getRidesByDriver = async (req, res) => {
  try {
    const rides = await Ride.find({ driverId: req.params.driverId }).populate('driverId');
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
