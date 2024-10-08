import express from 'express';
import { verifyAdmin } from '../utils/verifyToken.js';
import { createVehicle, deleteVehicle, getVehicles, updatedVehicles , selectSeat , deselectSeat, getVehicleById } from '../controllers/vehicles.js';
const router = express.Router();

router.get('/' , getVehicles);
router.post('/' , verifyAdmin ,  createVehicle);
router.delete('/:id' , verifyAdmin ,  deleteVehicle);
router.put('/:id' , verifyAdmin ,  updatedVehicles);
router.get('/:id'  ,  getVehicleById);

router.post('/select-seat/:id', selectSeat );
router.post('/deselect-seat/:id', deselectSeat );

export default router;