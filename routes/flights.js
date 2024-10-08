import express from "express";
import {getFlights , createFlight , deleteFlight , updateFlight} from './../controllers/flight.js'
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

router.get('/' , getFlights);
router.post('/' , verifyAdmin ,  createFlight);
router.delete('/:id' , verifyAdmin ,  deleteFlight);
router.put('/:id' , verifyAdmin ,  updateFlight);

export default router;

