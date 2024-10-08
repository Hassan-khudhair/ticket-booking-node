import mongoose from "mongoose";


const seatSchema = new mongoose.Schema({
    seat_number: String, // Seat number (e.g., "1A", "1B", etc.)
    available: { type: Boolean, default: true } // Availability of the seat
  });

const VehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    seatsReserved: {
        type: Number,
        default: 0,
    },
    seatsAvailable: {
        type: Number,
        default: 0,
    },
    seats:[seatSchema]
},
{ timestamps: true }
);

export default mongoose.model("Vehicle", VehicleSchema)