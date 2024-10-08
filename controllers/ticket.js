import Flight from "../models/Flight.js";
import Ticket from "../models/Ticket.js";

export const getSingelTicket = async (req , res , next)=>{
    try {
        const ticket = await Ticket.findById(req.params.id);
        const populatedTickets = [];

        
            const flight1 = await Flight.findById(ticket.flightId1);
            const flight2 = await Flight.findById(ticket.flightId2);
            if (flight1 || flight2) {
                const populatedTicket = {
                ...ticket.toObject(), 
                flight1: flight1.toObject(),
                flight2: flight2 == null ? null : flight2.toObject(),
                };
                populatedTickets.push(populatedTicket);
            }
        
        
        res.status(200).json(populatedTickets);
    } catch (error) {
        next(error)
    }
}


export const getTickets = async (req , res , next)=>{
    try {
        const tickets = await Ticket.find();
        const populatedTickets = [];

        for (const ticket of tickets) {
            const flight1 = await Flight.findById(ticket.flightId1);
            const flight2 = await Flight.findById(ticket.flightId2);
            if (flight1 || flight2) {
                const populatedTicket = {
                ...ticket.toObject(), 
                flight1: flight1.toObject(),
                flight2: flight2 == null ? null : flight2.toObject(),
                };
                populatedTickets.push(populatedTicket);
            }
        }
        
        res.status(200).json(populatedTickets);
    } catch (error) {
        next(error)
    }
}

export const createTicket = async (req, res , next)=>{
    const newTicket = new Ticket(req.body);
    try {
        const savedTicket = await newTicket.save();
        res.status(200).json(savedTicket);
    } catch (error) {
        next(error)
    }
}

export const deleteTicket = async (req,res, next)=>{
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        res.status(201).json("ticket has be deleted");
    } catch (error) {
        next(error)
    }
}


export const updateTicket = async (req, res, next) => {
  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTicket);
  } catch (err) {
    next(err);
  }
};