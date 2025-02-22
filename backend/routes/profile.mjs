import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.mjs';
import { getTransactionHistory } from '../controllers/transactionController.mjs';
import { getWalletBalance } from '../controllers/depositController.mjs';

const router = express.Router();

// Get Profile
router.get('/', getProfile);

// Update Profile
router.post('/', updateProfile);

router.get('/history',  getTransactionHistory);

router.get('/balance',  getWalletBalance);

export default router;