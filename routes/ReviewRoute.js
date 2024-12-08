const express = require('express');
const router = express.Router();
const { getReviewsByUser,getAllReviews, getReviewsByRide, getReviewsByDriver ,createReview , updateReview ,updateReviewByRide, deleteReview} = require('../controllers/Review.controller.js');

// Get all reviews
router.get('/', getAllReviews);

// Get reviews for a specific ride
router.get('/ride/:rideId', getReviewsByRide);


// Get reviews for a specific ride
router.get('/ride-user/:userId', getReviewsByUser);


// Get reviews for a specific driver
router.get('/driver/:driverId',  getReviewsByDriver);

// Create a new review
router.post('/', createReview);

// Update a review
router.put('/:id', updateReview);

// Update a review by ride ID
// router.put('update-by-ride/:id', updateReviewByRide);

// Delete a review
router.delete('/:id', deleteReview);

module.exports = router;
