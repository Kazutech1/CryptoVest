import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the cors middleware
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import investmentRoutes from './routes/investmentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import './utils/cron.js'; // Add this line at the top of the file

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes); // All auth routes will start with /api/auth
app.use('/api/user', userRoutes);
app.use('/api/investment', investmentRoutes);
app.use('/api/deposit', userRoutes);
app.use('/api/investment', investmentRoutes);
app.use('/api/admin', adminRoutes);

// Default route to check if the server is running
app.get('/', (req, res) => {
  res.send('Server is running! 🚀');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});