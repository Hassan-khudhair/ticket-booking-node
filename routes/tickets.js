import express from 'express';
import { getTickets , createTicket ,deleteTicket, updateTicket, getSingelTicket } from "../controllers/ticket.js";
import { verifyAdmin } from '../utils/verifyToken.js';
const router = express.Router();

router.get('/' , getTickets);
router.get('/:id' , getSingelTicket);
router.post('/' , verifyAdmin ,  createTicket);
router.delete('/:id' , verifyAdmin ,  deleteTicket);
router.put('/:id' , verifyAdmin ,  updateTicket);

export default router;