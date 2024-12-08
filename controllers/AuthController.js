const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/GenerateOTP.js");
const { sendOTPEmail } = require("../utils/SendMail.js");

// get all user
exports.getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json({ user: users });
  } catch (err) {
    console.log(err);
  }
};

// get all user by id
exports.getUserByid = async (req, res) => {
  try {
    const users = await User.find({_id : req.params.id });
    res.status(201).json({ user: users });
  } catch (err) {
    console.log(err);
  }
};

exports.registerUser = async (req, res) => {
  const { name, email, password,phone } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err });
      } else {
        try {
          const newUser = new User({
            name: name,
            password: hash,
            email: email,
            phone:phone,
          });
          newUser
            .save()
            .then((result) => {
              console.log("object");
              res.status(201).json({
                newuser: result,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: err,
              });
            });
        } catch (err) {
          console.log(err);
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.verifyGmail = async (req, res) => {
  const { otp, email } = req.body;

  try {
    const user = await User.find({ email });
    console.log(user);
    if (user && otp == user[0].otp.code && user[0].otp.expiresAt > Date.now()) {
      user[0].email.isVerified = true;
      await user.save();
      res.status(201).json({
        email: user[0].email,
        name: user[0].name,
        token: token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or otp" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          email: user.email,
          name: user.name,
           userType: user.userType,
        },
        "jaiShreeRam",
        { expiresIn: "3h" }
      );

      res.status(201).json({
        email: user.email,
        name: user.name,
        userID: user._id,
        token: token,
       });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Generate OTP
exports.generateOTP = async (req, res) => {
  const { email, message } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Set OTP and expiration time
    user.otp = {
      code: otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // OTP expires in 5 minutes
    };

    // Save the updated user data
    await user.save();
    await sendOTPEmail(email , otp , message)

    // Send OTP to email (You can implement your email logic here)
    console.log(`OTP for ${email}: ${otp}`);
    res.status(200).json({ message: "OTP sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login through OTP

exports.loginOTP = async (req, res) => {
  const { otp, email } = req.body;

  try {
    const user = await User.find({ email });
    console.log(user);
    if (user && otp == user[0].otp.code && user[0].otp.expiresAt > Date.now()) {
      const token = jwt.sign(
        {
          email: user[0].email,
          name: user[0].name,
          userType: user[0].userType,
        },
        "jaiShreeRam",
        { expiresIn: "3h" }
      );
      res.status(201).json({
        email: user[0].email,
        name: user[0].name,
        token: token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or otp" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.find({
    email,
  });
   if (!user)
    return res.status(400).json({ message: "Invalid or expired user" });
   const hash = await bcrypt.hash(newPassword, 10);
   user[0].password = hash;
  await user[0].save()
    .then((result) => {
      res.status(200).json({ message: "Password reset successful" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  const { email, newPassword, otp } = req.body;
  try {
    const user = await User.find({ email });
     if (user && otp == user[0].otp.code && user[0].otp.expiresAt > Date.now()) {
      const hash = await bcrypt.hash(newPassword, 10);
      user[0].password = hash;
        await user[0].save()
        .then((result) => {
          res.status(200).json({ message: "Password reset successful" });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    } else {
      res.status(401).json({ message: "Invalid email or otp" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


exports.updateUser = async (req, res) => {
  const { id } = req.body;

  try {
    // Fetch the user
    const user = await User.findOne({ _id: id });

    // Handle case where user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user type
    user.userType = "driver";

    // Save changes to database
    await user.save();

    // Respond with the updated user
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};



