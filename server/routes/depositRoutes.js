import express from 'express';
import { recordDeposit, verifyDeposit } from '../services/depositService.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { Deposit } from '../models/Deposit.js';

const router = express.Router();

// Record a new deposit
router.post('/record', authMiddleware, async (req, res) => {
  try {
    const { amount, trxHash } = req.body;
    const deposit = await recordDeposit(req.userId, amount, trxHash);
    res.status(201).json({ message: 'Deposit recorded successfully', deposit });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Verify a deposit
router.post('/verify', authMiddleware, async (req, res) => {
  try {
    const { trxHash } = req.body;
    const deposit = await verifyDeposit(trxHash);
    res.status(200).json({ message: 'Deposit verified successfully', deposit });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// Get deposit history for the logged-in user
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const deposits = await Deposit.find({ user: req.userId })
      .sort({ createdAt: -1 }) // Newest first
      .select('-__v'); // Exclude version key

    res.status(200).json({ deposits });
  } catch (err) {
    res.status(500).json({ 
      message: 'Error fetching deposit history', 
      error: err.message 
    });
  }
});

export default router;

