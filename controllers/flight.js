import Flight from "../models/Flight.js";
import Vehicle from "../models/Vehicle.js";


export const getFlights = async (req , res , next)=>{
    
    try {
        const flights = await Flight.find();
        // Array to store populated flights with vehicle details
        const populatedFlights = [];
    
        // Loop through each flight
        for (const flight of flights) {
          // Fetch the vehicle details using the vehicle ID from the flight document
          const vehicle = await Vehicle.findById(flight.vehicleId);
    
          // If the vehicle is found, add it to the flight object
          if (vehicle) {
            // Add vehicle details to the flight object
            const populatedFlight = {
              ...flight.toObject(), // Convert flight to plain JavaScript object
              vehicle: vehicle.toObject() // Convert vehicle to plain JavaScript object
            };
    
            // Add populated flight to the array
            populatedFlights.push(populatedFlight);
          }
        }
        res.status(200).json(populatedFlights);
    } catch (error) {
        next(error)
    }
}


export const createFlight = async (req, res , next)=>{
    
    const newFlight = new Flight(req.body);
    try {
        const savedFlight = await newFlight.save();

        res.status(200).json(savedFlight);
    } catch (err) {
        next(err);
    }
};

export const deleteFlight = async (req,res, next)=>{
    try {
        const flight = await Flight.findByIdAndDelete(req.params.id);
        res.status(201).json("flight has be deleted");
    } catch (error) {
        next(error)
    }
}

export const updateFlight = async (req, res, next) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedFlight);
  } catch (err) {
    next(err);
  }
};


