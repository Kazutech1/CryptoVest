import Transaction from '../models/Transaction.mjs';
import User from '../models/User.mjs';

// Get User's Transaction History
export const getTransactionHistory = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from JWT middleware

    const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get All Transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
