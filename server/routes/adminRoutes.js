import express from 'express';
import { User } from '../models/UserModel.js';
import { InvestmentPlan } from '../models/InvestmentPlan.js';
import { Investment } from '../models/Investment.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Middleware to ensure only admins can access these routes
router.use(authMiddleware, adminMiddleware);

// 1. Suspend a user
router.put('/suspend-user/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isSuspended = true;
    await user.save();

    res.status(200).json({ message: 'User suspended successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error suspending user', error: err.message });
  }
});

// 2. Delete a user
router.delete('/delete-user/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
});

// 3. View all users (with details)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
});

// 4. View a user's active plans
router.get('/user-plans/:userId', async (req, res) => {
  try {
    const investments = await Investment.find({ user: req.params.userId, status: 'active' })
      .populate('plan', 'name roi duration')
      .select('-__v');

    res.status(200).json({ investments });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user plans', error: err.message });
  }
});

// 5. Create a new investment plan
router.post('/create-plan', async (req, res) => {
  try {
    const { name, risk, roi, min, duration, features } = req.body;

    const plan = new InvestmentPlan({
      name,
      risk,
      roi,
      min,
      duration,
      features,
    });
    await plan.save();

    res.status(201).json({ message: 'Plan created successfully', plan });
  } catch (err) {
    res.status(500).json({ message: 'Error creating plan', error: err.message });
  }
});

// 6. Delete an investment plan
router.delete('/delete-plan/:planId', async (req, res) => {
  try {
    const plan = await InvestmentPlan.findByIdAndDelete(req.params.planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting plan', error: err.message });
  }
});

// 7. Approve or decline a user's withdrawal address
router.put('/approve-withdrawal/:userId', async (req, res) => {
  try {
    const { withdrawalAddress, status } = req.body; // status: 'approved' or 'declined'

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.withdrawalAddress = withdrawalAddress;
    user.withdrawalStatus = status;
    await user.save();

    res.status(200).json({ message: `Withdrawal address ${status}`, user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating withdrawal address', error: err.message });
  }
});

// 8. View a user's IP address
router.get('/user-ip/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('ipAddress');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ ipAddress: user.ipAddress });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user IP', error: err.message });
  }
});


// Get all withdrawal requests
router.get('/withdrawal-requests', async (req, res) => {
  try {
    const withdrawalRequests = await WithdrawalRequest.find()
      .populate('user', 'email')
      .sort({ createdAt: -1 });

    res.status(200).json({ withdrawalRequests });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching withdrawal requests', error: err.message });
  }
});

// Approve or decline a withdrawal request
router.put('/approve-withdrawal/:requestId', async (req, res) => {
  try {
    const { status } = req.body; // status: 'approved' or 'declined'
    const withdrawalRequest = await WithdrawalRequest.findById(req.params.requestId);

    if (!withdrawalRequest) {
      return res.status(404).json({ message: 'Withdrawal request not found' });
    }

    // Update the withdrawal request status
    withdrawalRequest.status = status;
    await withdrawalRequest.save();

    // If approved, deduct the amount from the user's withdrawable balance
    if (status === 'approved') {
      const user = await User.findById(withdrawalRequest.user);
      user.withdrawableBalance -= withdrawalRequest.amount;
      await user.save();
    }

    res.status(200).json({ 
      message: `Withdrawal request ${status}`, 
      withdrawalRequest 
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating withdrawal request', error: err.message });
  }
});

export default router;