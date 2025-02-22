import express from 'express';
import { createWithdrawalRequest, getUserWithdrawalRequests } from '../controllers/withdrawalController.mjs';

const router = express.Router();

// Create Withdrawal Request
router.post('/request', createWithdrawalRequest);

// Get User's Withdrawal Requests
router.get('/requests', getUserWithdrawalRequests);

export default router;7