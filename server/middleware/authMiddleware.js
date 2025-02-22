import { verifyToken } from '../utils/jwt.js';

// Middleware to verify JWT token
export const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.id; // Attach the user ID to the request object
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};