import express from 'express';
import mongoose from 'mongoose';
import path from 'path'
import dotenv from 'dotenv';
import cors from 'cors'

// Load environment variables
dotenv.config();

const __dirname = path.resolve()

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());  // Apply global middleware for JSON parsing


app.use(cors({
  origin: 'http://localhost:5173', // Allow only your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true // Allow cookies if using authentication
}));
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Import routes
import authRoutes from './routes/auth.mjs';
import profileRoutes from './routes/profile.mjs';
import dashboardRoutes from './routes/dashboard.mjs';
import investmentsRoutes from './routes/investments.mjs';
import adminRoutes from './routes/admin.mjs';
import referralsRoutes from './routes/referrals.mjs';
import authMiddleware from './middleware/authMiddleware.mjs';
import depositRoutes from './routes/deposit.mjs';
import withdrawalRoutes from './routes/withdrawal.mjs';

// Use routes
app.use('/api/auth', authRoutes);  // No authentication required for auth routes

// Apply authMiddleware only for routes that need authentication
app.use('/api/profile', authMiddleware, profileRoutes);
app.use('/api/dashboard', authMiddleware, dashboardRoutes);
app.use('/api/investments', authMiddleware, investmentsRoutes);
app.use('/api/admin', authMiddleware, adminRoutes);
app.use('/api/referrals', authMiddleware, referralsRoutes);
app.use('/api/deposit', authMiddleware, depositRoutes);
app.use('/api/withdrawal', authMiddleware, withdrawalRoutes);


app.use(express.static(path.join(__dirname, "/client/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})

export default app;
 