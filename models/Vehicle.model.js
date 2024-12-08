const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "driver",
     },
    model: { type: String,   },
    licensePlate: { type: String,   },
    vehicleType: { type: String, enum: ["Cab", "Auto"],   },
    capacity: { type: Number,   },
    image: { type: String },
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("vehicle", vehicleSchema);

module.exports = Vehicle;
