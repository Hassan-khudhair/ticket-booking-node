import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import flightsRoute from "./routes/flights.js";
import vehiclesRoute from "./routes/vehicles.js";
import paymentRoute from "./routes/payments.js";
import reservationRoute from "./routes/reservation.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import ticketsRoute from "./routes/tickets.js";
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/tickets" , ticketsRoute);
app.use("/api/flights" , flightsRoute);
app.use("/api/vehicles" , vehiclesRoute);
app.use("/api/payment" , paymentRoute);
app.use("/api/reservation" , reservationRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
