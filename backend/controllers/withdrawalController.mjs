// src/controllers/withdrawalController.js
import WithdrawalRequest from '../models/WithdrawalRequest.mjs';
import User from '../models/User.mjs';
import Transaction from '../models/Transaction.mjs';
import { v4 as uuidv4 } from 'uuid';

// Create Withdrawal Request
export const createWithdrawalRequest = async (req, res) => {
  try {
    const userId = req.userId; // Assuming you have middleware to extract userId from JWT
    const { amount } = req.body;

    // Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if the amount is at least 5
    if (amount < 5) return res.status(400).json({ message: 'Minimum withdrawal amount is 5' });

    // Check if the user has enough balance
    if (user.profitBalance < amount) return res.status(400).json({ message: 'Insufficient balance' });

    // Deduct amount from balance
    user.profitBalance -= amount;
    await user.save();

    
    // Check if the user already has a pending withdrawal request
    const pendingRequest = await WithdrawalRequest.findOne({ userId, status: 'pending' });
    if (pendingRequest) return res.status(400).json({ message: 'You already have a pending withdrawal request' });

    // Create withdrawal request
    const newWithdrawalRequest = new WithdrawalRequest({
      userId,
      amount,
      status: 'pending', // Default status
    });

    await newWithdrawalRequest.save();

    // Create transaction record
    const transaction = new Transaction({
      transactionId: uuidv4(),
      userId,
      type: 'withdrawal',
      amount,
      currency: 'TRX',
      status: 'pending',
    });

    await transaction.save();

    res.status(201).json({ message: 'Withdrawal request created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User's Withdrawal Requests
export const getUserWithdrawalRequests = async (req, res) => {
  try {
    const userId = req.userId; // Assuming you have middleware to extract userId from JWT
    const withdrawalRequests = await WithdrawalRequest.find({ userId }).sort({ createdAt: -1 });
    res.json(withdrawalRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Admin: Get All Withdrawal Requests
export const getAllWithdrawalRequests = async (req, res) => {
  try {
    const withdrawalRequests = await WithdrawalRequest.find().sort({ createdAt: -1 });

    res.json(withdrawalRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Approve Withdrawal Request
export const approveWithdrawalRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    // Find withdrawal request
    const withdrawalRequest = await WithdrawalRequest.findById(requestId);
    if (!withdrawalRequest) return res.status(404).json({ message: 'Withdrawal request not found' });

    // Find user
    const user = await User.findById(withdrawalRequest.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if the user has enough balance
    if (user.balance < withdrawalRequest.amount) return res.status(400).json({ message: 'Insufficient balance' });

    // Deduct amount from user balance
    user.balance -= withdrawalRequest.amount;

    // Update withdrawal request status
    withdrawalRequest.status = 'approved';

    // Save changes
    await user.save();
    await withdrawalRequest.save();

    res.json({ message: 'Withdrawal request approved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Reject Withdrawal Request
export const rejectWithdrawalRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    // Find withdrawal request
    const withdrawalRequest = await WithdrawalRequest.findById(requestId);
    if (!withdrawalRequest) return res.status(404).json({ message: 'Withdrawal request not found' });

    // Update withdrawal request status
    withdrawalRequest.status = 'rejected';

    // Save changes
    await withdrawalRequest.save();

    res.json({ message: 'Withdrawal request rejected successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};