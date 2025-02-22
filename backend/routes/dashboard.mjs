import express from 'express';
import { getDashboardData } from '../controllers/dashboardController.mjs';

const router = express.Router();

// Get Dashboard Data
router.get('/', getDashboardData);

export default router;