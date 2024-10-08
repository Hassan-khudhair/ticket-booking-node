import express from 'express';
import { verifyAdmin } from '../utils/verifyToken.js';
import { createPayment, deletePayment, getPayments, updatePayment } from '../controllers/payment.js';
const router = express.Router();

router.get('/' , getPayments);
router.post('/' , verifyAdmin ,  createPayment);
router.delete('/:id' , verifyAdmin , deletePayment);
router.put('/:id' , verifyAdmin , updatePayment);

export default router;