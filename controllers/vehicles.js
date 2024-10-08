import Flight from "../models/Flight.js";
import Vehicle from "../models/Vehicle.js";

const generateAndAssignSeats = (vehicleType, capacity) => {
    const seats = [];
    let rows ;
    let seatLetters ;
    if(capacity <= 50) {
      rows = Math.ceil(capacity / 4);
      seatLetters = ['A', 'B', 'C', 'D'];
    }else if(capacity > 60 && capacity < 150){
      rows = Math.ceil(capacity / 8); 
      seatLetters = ['A', 'B', 'C', 'D', 'E', 'F' , 'G' , 'H'];
    }else if(capacity >= 150){
      rows = Math.ceil(capacity / 6); 
      seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
    }
    for (let row = 1; row <= rows; row++) {
      for (let letter of seatLetters) {
        if (seats.length < capacity) {
          seats.push({
            seat_number: `${row}${letter}`,
            available: true 
          });
        }
      }
    }
  
    return seats;
  };

export const getVehicles = async (req , res , next)=>{
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        next(error)
    }
}
export const getVehicleById = async (req , res , next)=>{
  const vehicleId = req.params.id
    try {
        const vehicle = await Vehicle.findById(vehicleId);
        res.status(200).json([vehicle]);
    } catch (error) {
        next(error)
    }
}

export const createVehicle = async (req, res , next)=>{
    const {type , capacity , name } = req.body;
    
    
    try {
        const seats = generateAndAssignSeats(type, capacity);
        const availabelLength = seats.filter((item)=> item.available === true ).length
        const vehicle = new Vehicle({
            name, 
            capacity, 
            type, 
            seats ,
            seatsAvailable : availabelLength
        });
        
        const savedVehicle = await vehicle.save();

        res.status(200).json(savedVehicle);
    } catch (err) {
        next(err);
    }
}


export const deleteVehicle = async (req,res, next)=>{
    try {
        const Vehicle = await Vehicle.findByIdAndDelete(req.params.id);
        res.status(201).json("Vehicle has be deleted");
    } catch (error) {
        next(error)
    }
}


export const updatedVehicles = async (req, res, next) => {
  try {
    const updatedVehicles = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedVehicles);
  } catch (err) {
    next(err);
  }
};

const findSeatByNumber = (vehicle, seatNumber) => {
  for (let seat of vehicle.seats) {
    if (seat.seat_number === seatNumber) {
      return seat; 
    }
  }
  return null;
};


export const selectSeat = async (req, res) => {
  const { seat_number } = req.body;

  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    const seat = vehicle.seats.find(seat => seat.seat_number === seat_number);
    if (!seat || !seat.available) {
      return res.status(400).json({ error: 'Seat is not available' });
    }
    seat.available = false;
    const availabelLength = vehicle.seats.filter((item)=> item.available === true ).length;
    const reservedLength = vehicle.seats.filter((item)=> item.available === false ).length;
    vehicle.seatsAvailable = availabelLength;
    vehicle.seatsReserved = reservedLength; 
    await vehicle.save();
    res.status(200).json({ message: 'Seat selected successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const deselectSeat = async (req, res) => {
  const {  seat_number } = req.body;

  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json( 'Vehicle not found');
    }
    const seat = vehicle.seats.find(seat => seat.seat_number === seat_number);
    if (!seat || seat.available) {
      return res.status(400).json({ error: 'Seat is already available' });
    }
    seat.available = true;
    const availabelLength = vehicle.seats.filter((item)=> item.available === true ).length;
    const reservedLength = vehicle.seats.filter((item)=> item.available === false ).length;
    vehicle.seatsAvailable = availabelLength;
    vehicle.seatsReserved = reservedLength; 
    await vehicle.save();
    res.status(200).json({ message: 'Seat deselected successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
