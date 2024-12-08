const Review = require('../models/Review.model');
const Ride = require('../models/Rides.model');
const Driver = require('../models/Driver.model');

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('rideId', 'from to fare')
      .populate('userId', 'name email')
      .populate('driverId', 'name licenseNumber');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get reviews for a specific ride
exports.getReviewsByRide = async (req, res) => {
  try {
    const reviews = await Review.find({ rideId: req.params.rideId })
      .populate('userId', 'name email')
      .populate('driverId', 'name licenseNumber')
      .populate('rideId', 'from to fare')

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get reviews for a specific user
exports.getReviewsByUser = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.params.userId })
      .populate('userId', 'name email')
      .populate('driverId', 'name licenseNumber')
      .populate('rideId', 'from to fare')

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get reviews for a specific driver
exports.getReviewsByDriver = async (req, res) => {
  try {
    const reviews = await Review.find({ driverId: req.params.driverId })
      .populate('userId', 'name email')
      .populate('rideId', 'from to');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { rideId, userId, driverId, rating, comment } = req.body;
     // Check if the ride exists
    // const ride = await Ride.findById(rideId);
    // if (!ride) {
    //   return res.status(404).json({ message: 'Ride not found' });
    // }

    // Check if the driver exists
    // const driver = await Driver.findById(driverId);
    if (!driverId) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    const review = new Review({ rideId, userId, driverId, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const { rating, comment,status1 } = req.body;
     const review = await Review.findById(req.params.id);
    // if (!review) {
    //   return res.status(404).json({ message: 'Review not found' });
    // }
    
     if (rating) review.rating = rating;
    if (comment) review.comment = comment;
    if (status1) review.status1 = status1;

    await review.save();
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
