import mongoose from "mongoose";
const TicketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    twoWay: {
        type: Boolean,
        default:false,
    },
    flightId1: {
        type: String,
        required:true,
    },
    flightId2: {
        type: String,
        default:null,
    },
    price: {
        type: Number,
        required: true,
    },
    },
{ timestamps: true }
);

export default mongoose.model("Ticket", TicketSchema);