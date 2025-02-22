import express from 'express';
import { getInvestmentPlans, purchaseInvestmentPlan } from '../controllers/investmentsController.mjs';

const router = express.Router();

// Get Investment Plans
router.get('/plans', getInvestmentPlans);

// Purchase Investment Plan
router.post('/purchase', purchaseInvestmentPlan);

export default router;