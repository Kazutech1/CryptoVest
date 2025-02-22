import express from 'express';
import { login, register, verifyToken } from '../controllers/authController.mjs';

const router = express.Router();

// Register
router.post('/register', register);

// Login
router.post('/login', login);

router.get('/verify', verifyToken);

export default router;