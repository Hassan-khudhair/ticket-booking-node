import Flight from "../models/Flight.js";
import Reservations from "../models/Reservations.js";
import Ticket from "../models/Ticket.js";
import User from "../models/User.js";

export const getReservations = async (req , res , next)=>{
    try {
        const reservations = await Reservations.find();
        const populatedTickets = [];
        for (const reservation of reservations) {
          const ticket = await Ticket.findById(reservation.ticketId);
          const user = await User.findById(reservation.userId);

          const populatedFlights = [];
            const flight1 = await Flight.findById(ticket.flightId1);
            const flight2 = await Flight.findById(ticket.flightId2);
            if (flight1 || flight2) {
                const populatedFlight = {
                ...ticket.toObject(), 
                flight1: flight1.toObject(),
                flight2: flight2 == null ? null : flight2.toObject(),
                };
                populatedFlights.push(populatedFlight);
            }
          if (ticket || user) {
            const populatedTicket = {
              ...reservation.toObject(), 
              user: user == null ? null : user.toObject(),
              ticket: populatedFlights 
            };
            populatedTickets.push(populatedTicket);
          }
        }
        res.status(200).json(populatedTickets);
    } catch (error) {
        next(error)
    }
}

export const createReservation = async (req, res , next)=>{
    const newReservation = new Reservations(req.body);
    try {
        const savedReservation = await newReservation.save();
        res.status(200).json(savedReservation);
    } catch (error) {
        next(error)
    }
}

export const deleteReservation = async (req,res, next)=>{
    try {
        await Reservations.findByIdAndDelete(req.params.id);
        res.status(201).json("Reservation has be deleted");
    } catch (error) {
        next(error)
    }
}


export const updateReservation = async (req, res, next) => {
  try {
    const updatedReservation = await Reservations.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedReservation);
  } catch (err) {
    next(err);
  }
};




export const setActive = async (req, res) => {
    const { seat_number } = req.body;
  
    try {
      const reservation = await Reservations.findById(req.params.id);
      if (!reservation) {
        return res.status(404).json({ error: 'reservation not found' });
      }
      
      if (reservation.active) {
        return res.status(400).json({ error: 'reservation already active' });
      }
      reservation.active = true;
      await reservation.save();
      res.status(200).json({ message: 'Activated Successfully' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
  export const deActive = async (req, res) => {
  
    try {
        const reservation = await Reservations.findById(req.params.id);
        if (!reservation) {
          return res.status(404).json({ error: 'reservation not found' });
        }
        
        if (!reservation.active) {
          return res.status(400).json({ error: 'reservation already deActive' });
        }
        reservation.active = false;
        await reservation.save();
        res.status(200).json({ message: 'DeActivated Successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };