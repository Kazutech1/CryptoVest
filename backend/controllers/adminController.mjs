import mongoose from 'mongoose';
import User, { decrypt } from '../models/User.mjs';
import InvestmentPlan from '../models/InvestmentPlan.mjs';
import Transaction from '../models/Transaction.mjs';
import Announcement from '../models/Announcement.mjs';
import WithdrawalRequest from '../models/WithdrawalRequest.mjs';

// Middleware to check if the user is an admin
export const isAdmin = async (req, res, next) => {
 try {
    const user = await User.findById(req.userId);
    console.log(user);
    
    if (!user || !user.role == 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// User Management
export const getUsers = async (req, res) => {
  try {
    let users = await User.find().select('-passwordHash +wallet.privateKey'); // Ensure privateKey is fetched

    // Decrypt private keys before sending
    users = users.map(user => ({
      ...user.toObject(),
      wallet: {
        trxAddress: user.wallet.trxAddress,
        privateKey: user.wallet.privateKey ? decrypt(user.wallet.privateKey) : null // Properly access and decrypt
      }
    }));

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, profile, balance } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { username, email, profile, balance },
      { new: true }
    ).select('-passwordHash -wallet');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Investment Plan Management
export const getInvestmentPlansAdmin = async (req, res) => {
  try {
    const plans = await InvestmentPlan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createInvestmentPlan = async (req, res) => {
  try {
    const { planId, name, icon, roi, minimum, duration, benefits } = req.body;

    const newPlan = new InvestmentPlan({
      planId,
      name,
      icon,
      roi,
      minimum,
      duration,
      benefits
    });

    await newPlan.save();

    res.status(201).json({ message: 'Investment plan created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateInvestmentPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, icon, roi, minimum, duration, benefits } = req.body;

    const plan = await InvestmentPlan.findByIdAndUpdate(
      id,
      { name, icon, roi, minimum, duration, benefits },
      { new: true }
    );

    if (!plan) return res.status(404).json({ message: 'Investment plan not found' });

    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteInvestmentPlan = async (req, res) => {
  try {
    const { id } = req.params;

    const plan = await InvestmentPlan.findByIdAndDelete(id);
    if (!plan) return res.status(404).json({ message: 'Investment plan not found' });

    res.json({ message: 'Investment plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Transaction Management
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Balance Adjustment
export const adjustBalance = async (req, res) => {
  try {
    const { id } = req.params;
    const { balance } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { balance },
      { new: true }
    ).select('-passwordHash -wallet');

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Announcement Management
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // Ensure user is authenticated
    if (!req.userId) {
      return res.status(403).json({ message: "Unauthorized. Please log in." });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAnnouncement = new Announcement({
      title,
      content,
      author: user._id // Automatically assign the logged-in user as the author
    });

    await newAnnouncement.save();
    res.status(201).json({ message: "Announcement created successfully", announcement: newAnnouncement });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const announcement = await Announcement.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!announcement) return res.status(404).json({ message: 'Announcement not found' });

    res.json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findByIdAndDelete(id);
    if (!announcement) return res.status(404).json({ message: 'Announcement not found' });

    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Withdrawal Request Management
export const getAllWithdrawalRequests = async (req, res) => {
  try {
    const withdrawalRequests = await WithdrawalRequest.find()
      .populate("userId", "username email") // Populate username & email from User model
      .sort({ createdAt: -1 });

    res.json(withdrawalRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


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