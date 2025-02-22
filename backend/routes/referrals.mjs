import express from 'express';
import { getReferralInformation } from '../controllers/referralsController.mjs';

const router = express.Router();

// Get Referral Information
router.get('/', getReferralInformation);

export default router;