import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { User } from '../models/UserModel.js';
import { InvestmentPlan } from '../models/InvestmentPlan.js';

const router = express.Router();

/**
 * POST /investments/buy
 * Buy an investment plan.
 */
router.post('/buy', authMiddleware, async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.userId;

    // Fetch the user and the selected plan
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const plan = await InvestmentPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    // Parse the minimum investment amount
    const minimumAmount = parseFloat(plan.minimum.replace(/[^0-9.-]+/g, ''));

    // Check if the user has enough balance
    if (user.availableBalance < minimumAmount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Calculate daily profit
    const roiPercentage = parseFloat(plan.roi);
    const durationInDays = parseDurationToDays(plan.duration);
    const totalProfit = (minimumAmount * roiPercentage) / 100;
    const dailyProfit = totalProfit / durationInDays;

    // Deduct the investment amount from the user's available balance
    user.availableBalance -= minimumAmount;

    // Add the investment to the user's active investments
    user.activeInvestments.push({
      planId: plan._id,
      amountInvested: minimumAmount,
      startDate: new Date(),
      endDate: new Date(Date.now() + durationInDays * 24 * 60 * 60 * 1000),
      roi: roiPercentage,
      totalProfit,
      dailyProfit,
      isActive: true,
    });

    // Add the first day's profit to the withdrawable balance
    user.withdrawableBalance += dailyProfit;

    // Save the updated user
    await user.save();

    res.status(200).json({
      message: 'Plan purchased successfully',
      withdrawableBalance: user.withdrawableBalance,
    });
  } catch (err) {
    console.error('Error buying plan:', err);
    res.status(500).json({ message: 'Error buying plan', error: err.message });
  }
});

// Helper function to convert duration strings like "4 Weeks" to days
const parseDurationToDays = (duration) => {
  const match = duration.match(/(\d+)\s*(Week|Month|Year)s?/i);
  if (!match) return 0;

  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case 'week':
      return value * 7;
    case 'month':
      return value * 30;
    case 'year':
      return value * 365;
    default:
      return 0;
  }
};

export default router;