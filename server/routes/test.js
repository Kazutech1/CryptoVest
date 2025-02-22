import express from 'express';
import { InvestmentPlan } from '../models/InvestmentPlan.js';

const router = express.Router();

// Test route to fetch all investment plans
router.get('/test-plans', async (req, res) => {
  try {
    const plans = await InvestmentPlan.find();
    res.status(200).json({ message: 'Plans fetched successfully', plans });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching plans', error: err.message });
  }
});

export default router;