import express from 'express';
import { simulateDeposit } from '../controllers/depositController.mjs';

const router = express.Router();

// Simulate Deposit
router.post('/simulate-deposit', simulateDeposit);

export default router;