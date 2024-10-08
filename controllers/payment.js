import Payment from "../models/Payment.js";

export const getPayments = async (req , res , next)=>{
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        next(error)
    }
}

export const createPayment = async (req, res , next)=>{
    const newPayment = new Payment(req.body);
    try {
        const savedPayment = await newPayment.save();
        res.status(200).json(savedPayment);
    } catch (error) {
        next(error)
    }
}

export const deletePayment = async (req,res, next)=>{
    try {
        const Payment = await Payment.findByIdAndDelete(req.params.id);
        res.status(201).json("Payment has be deleted");
    } catch (error) {
        next(error)
    }
}


export const updatePayment = async (req, res, next) => {
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
        );
        res.status(200).json(updatedPayment);
    } catch (err) {
        next(err);
    }
};