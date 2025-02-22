import express from 'express';
import { getProfile } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { User } from '../models/UserModel.js';
import { getTRXBalance } from '../utils/tronUtils.js';
import { Investment } from '../models/Investment.js';
import { WithdrawalRequest } from '../models/WithdrawalRequest.js';
import { confirmDeposit } from '../services/depositService.js';
import { Deposit } from '../models/Deposit.js';

const router = express.Router();

// Protected route to get user profile
router.get('/profile', authMiddleware, getProfile);

// Get the user's current TRX balance
router.get('/balance', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.trxWalletAddress) {
      return res.status(404).json({ message: 'User or wallet address not found' });
    }

    const trxBalance = await getTRXBalance(user.trxWalletAddress);
    res.status(200).json({ trxBalance });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching TRX balance', error: err.message });
  }
});


// Confirm deposit and update balance
router.post('/confirm', authMiddleware, async (req, res) => {
  try {
    const { newBalance, depositAmount } = await confirmDeposit(req.userId);
    res.status(200).json({
      message: 'Deposit confirmed successfully',
      newBalance,
      depositAmount,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// Request a withdrawal
router.post('/request-withdrawal', authMiddleware, async (req, res) => {
  try {
    const { amount, withdrawalAddress } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has enough withdrawable balance
    if (user.withdrawableBalance < amount) {
      return res.status(400).json({ message: 'Insufficient withdrawable balance' });
    }

    // Create a withdrawal request
    const withdrawalRequest = new WithdrawalRequest({
      user: req.userId,
      amount,
      withdrawalAddress,
    });
    await withdrawalRequest.save();

    res.status(201).json({ 
      message: 'Withdrawal request submitted successfully', 
      withdrawalRequest 
    });
  } catch (err) {
    res.status(500).json({ message: 'Error requesting withdrawal', error: err.message });
  }
});

// Get withdrawal history for the logged-in user
router.get('/withdrawal-history', authMiddleware, async (req, res) => {
  try {
    const withdrawalRequests = await WithdrawalRequest.find({ user: req.userId })
      .sort({ createdAt: -1 }) // Newest first
      .select('-__v'); // Exclude version key

    res.status(200).json({ withdrawalRequests });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching withdrawal history', error: err.message });
  }
});


router.get('/deposit-history', authMiddleware, async (req, res) => {
  try {
    const deposits = await Deposit.find({ user: req.userId })
      .sort({ createdAt: -1 }) // Newest first
      .select('-__v'); // Exclude version key

    res.status(200).json({ deposits });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching deposit history', error: err.message });
  }
});


router.get('/summary', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the withdrawable balance
    const withdrawableBalance = await updateWithdrawableBalance(req.userId);

    // Fetch active investments to get the active investment name and accumulated profit
    const activeInvestments = await Investment.find({
      user: req.userId,
      status: 'active',
    })
      .populate('plan', 'name')
      .populate('user', 'availableBalance');

    // Get the name of the active investment plan (if any)
    const activeInvestmentName = activeInvestments.length > 0
      ? activeInvestments[0].plan.name
      : 'None Yet';

    // Get the total accumulated profit from active investments
    const totalAccumulatedProfit = activeInvestments.reduce(
      (total, investment) => total + investment.accumulatedProfit,
      0
    );

    // Prepare summary data
    const summaryData = [
      {
        title: 'Total Balance',
        value: `${user.availableBalance.toFixed(2)} Trx`,
        icon: 'PieChart',
        color: 'blue',
      },
      {
        title: 'Investment Balance',
        value: `+${withdrawableBalance.toFixed(2)} Trx`,
        icon: 'DollarSign',
        color: 'green',
      },
      {
        title: 'Active Investment',
        value: activeInvestmentName,
        icon: 'BitcoinIcon',
        color: 'purple',
      },
      {
        title: 'Accumulated Profit',
        value: `${totalAccumulatedProfit.toFixed(2)} Trx`,
        icon: 'BarChart',
        color: 'orange',
      },
    ];

    res.status(200).json({ summaryData });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching summary data', error: err.message });
  }
});

export default router;


