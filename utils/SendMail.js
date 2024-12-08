 const nodemailer = require('nodemailer');

 const transporter = nodemailer.createTransport({
  service: 'gmail',  
  auth: {
    user: 'nishantrpr94@gmail.com',   
    pass: 'hhlu dwcs daat nlhd',    
  },
});

// Function to send OTP via email
const sendOTPEmail = async (email, otp, message) => {
  try {

    const mailOptions = {
      from: 'nishantrpr94@gmail.com',  
      to: email,                    
      subject: `Your OTP Code for ${message} `,    
      text: `Your OTP code for ${message} is: ${otp}. This code will expire in 5 minutes.`, // OTP message body
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}: ${otp}`);
  } catch (error) {
    console.error('Error sending OTP email:', error);
    throw new Error('Error sending OTP email'); // Rethrow to handle it in the caller function
  }
};

module.exports = {
  sendOTPEmail,
};
