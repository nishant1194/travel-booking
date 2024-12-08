const express = require('express') ;
const app = express() ;
const mongoose = require('mongoose') ;
 const cors = require('cors')
const bodyPareser = require('body-parser');
const {urlencoded, json} = require('body-parser') ;
//const connectToDatabase = require('./config/db.js')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/AuthRoute.js');
const driverRoutes = require('./routes/DriverRoute.js');
const paymentRoutes = require('./routes/PaymentRoute.js');
const reviewRoutes = require('./routes/ReviewRoute.js');
const rideRoutes = require('./routes/RideRoute.js');
const vehicleRoutes = require('./routes/VehicleRoute.js');

async function connectToDatabase() {
    try {
        console.log(' to the database');

      await mongoose.connect('mongodb+srv://nishantkumar32435:startup@cluster0.nak2m.mongodb.net/');
      console.log('Connected to the database');
    } catch (err) {
      console.error('Database connection failed', err);
    }
  }
  connectToDatabase() ;

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/driver', driverRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/review' , reviewRoutes);
app.use('/api/v1/ride', rideRoutes);
app.use('/api/v1/vehicle', vehicleRoutes);

app.get('*',(req,res)=>{
    res.status(200).json({
      message:'received request'
    })
  })
  
module.exports = app ;
