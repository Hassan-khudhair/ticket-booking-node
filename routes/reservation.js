import express from 'express';
import { verifyAdmin } from '../utils/verifyToken.js';
import { createReservation, deActive, deleteReservation, getReservations, setActive, updateReservation } from '../controllers/reservations.js';
const router = express.Router();

router.get('/'  ,  getReservations);
router.post('/'  ,  createReservation);
router.delete('/:id' , verifyAdmin ,  deleteReservation);
router.put('/:id' , verifyAdmin ,  updateReservation);
router.put('/setactive/:id' , verifyAdmin ,  setActive);
router.put('/deactive/:id' , verifyAdmin ,  deActive);

export default router;