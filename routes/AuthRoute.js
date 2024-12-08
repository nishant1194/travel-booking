const express = require('express');
const {getUserByid, getUser,registerUser, loginUser, generateOTP, resetPassword,loginOTP,verifyGmail ,forgotPassword ,updateUser} = require('../controllers/AuthController.js');

const router = express.Router();

router.get('/getUser', getUser); // User Registration
router.get('/getUser/:id', getUserByid); // User by id
router.post('/register', registerUser); // User Registration
router.post('/email-verification', verifyGmail); // verify email
router.post('/login', loginUser); // User Login
router.post('/otp', generateOTP); // Generate OTP
router.post('/otp-login', loginOTP); // Generate OTP
router.post('/reset-password', resetPassword); // Reset Password
router.post('/forgot-password', forgotPassword); // forgot Password
router.put('/update-user', updateUser); // forgot Password

module.exports = router;
