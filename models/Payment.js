import mongoose from "mongoose";
const PaymentSchema = new mongoose.Schema({
        firstName:{
            type:String, 
            required:true,
        },
        lastName:{
            type:String, 
            required:true,
        },
        cardNumber: {
            type: Number,
            required: true,
        },
        securityCode: {
            type: String,
            required: true,
        },
        expireDate: {
            type: String,
            required: true,
        },
        billingAddress: {
            type: Number,
            required: true,
        },
        amount: {
            type: String,
            required: true,
        },
        status: {
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema)