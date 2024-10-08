import mongoose from "mongoose";
const ReservationsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    ticketId: {
        type: String,
        required: true,
    },
    seats: {
        type: [String],
        required: true,
    },
    active:{
        type:Boolean,
        default:false,
    }
},
{ timestamps: true }
);

export default mongoose.model("Reservations", ReservationsSchema)