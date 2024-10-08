import mongoose from "mongoose";
const FlightSchema = new mongoose.Schema({
    flightName: {
        type: String,
        required: true,
    },
    airline: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    distance: {
        type: String,
        required: true,
    },
    vehicleId: {
        type: String,
        required: true,
    },
},
{ timestamps: true }
);

export default mongoose.model("Flight", FlightSchema)