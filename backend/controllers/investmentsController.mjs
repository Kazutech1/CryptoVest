import User from '../models/User.mjs';
import InvestmentPlan from '../models/InvestmentPlan.mjs';
import Transaction from '../models/Transaction.mjs';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';

// Get Investment Plans
export const getInvestmentPlans = async (req, res) => {
  try {
    const plans = await InvestmentPlan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const purchaseInvestmentPlan = async (req, res) => {
  try {
    const userId = req.userId; // Assuming you have middleware to extract userId from JWT
    const { planId, amount } = req.body;

    // Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check for active investments
    const activeInvestments = user.investments.filter(investment => new Date() <= investment.endDate);
    if (activeInvestments.length > 0) {
      return res.status(400).json({ message: 'You already have an active investment plan' });
    }

    // Find investment plan
    const plan = await InvestmentPlan.findById(planId);
    if (!plan) return res.status(404).json({ message: 'Investment plan not found' });

    // Check if the user has enough balance
    if (user.balance < amount) return res.status(400).json({ message: 'Insufficient balance' });

    // Check if the investment amount meets the minimum requirement
    if (amount < plan.minimum) return res.status(400).json({ message: `Minimum investment is ${plan.minimum} TRX` });

    // Deduct amount from user balance
    user.balance -= amount;

    // Calculate daily profit
    const dailyProfit = (amount * plan.roi) / (100); // ROI per day

    // Create investment record
    const investmentId = new mongoose.Types.ObjectId(); // Fix applied here
    user.investments.push({
      investmentId,
      planId,
      amount,
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + plan.duration * 7 * 24 * 60 * 60 * 1000), // Convert weeks to milliseconds
      profit: 0, // Initial profit is 0
      dailyProfit
    });

    // Create transaction record
    const transaction = new Transaction({
      transactionId: uuidv4() || new mongoose.Types.ObjectId().toString(), // Ensure a unique ID
      userId,
      type: 'investment',
      amount,
      currency: 'TRX',
      status: 'completed'
    });
    

    await user.save();
    await transaction.save();

    res.json({ message: 'Investment purchased successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
