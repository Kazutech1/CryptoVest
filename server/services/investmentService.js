import { User } from '../models/UserModel.js';
import { InvestmentPlan } from '../models/InvestmentPlan.js';
import { Investment } from '../models/Investment.js';


// Buy an investment plan
export const buyPlan = async (userId, planId, amount) => {
  try {
    const user = await User.findById(userId);
    const plan = await InvestmentPlan.findById(planId);

    // Check if user and plan exist
    if (!user || !plan) {
      throw new Error('User or plan not found');
    }

    // Check if the user already has an active investment
    const activeInvestment = await Investment.findOne({
      user: userId,
      status: 'active',
    });
    if (activeInvestment) {
      throw new Error('You already have an active investment plan. Please wait until it expires.');
    }

    // Check if the amount meets the plan's minimum requirement
    if (amount < plan.minimum) {
      throw new Error(`Amount must be at least ${plan.minimum}`);
    }

    // Check if the user has enough balance
    if (user.availableBalance < amount) {
      throw new Error('Insufficient balance');
    }

    // Deduct the amount from the user's available balance
    user.availableBalance -= amount;

    // Calculate the end date based on the plan's duration
    const durationParts = plan.duration.split(' ');
    const durationValue = parseInt(durationParts[0]);
    const durationUnit = durationParts[1];
    const endDate = new Date();
    if (durationUnit === 'day' || durationUnit === 'days') {
      endDate.setDate(endDate.getDate() + durationValue);
    } else if (durationUnit === 'month' || durationUnit === 'months') {
      endDate.setMonth(endDate.getMonth() + durationValue);
    }

    // Create a new investment
    const investment = new Investment({
      user: userId,
      plan: planId,
      amount,
      endDate,
      status: 'active', // Ensure the investment is marked as active
      accumulatedProfit: 0, // Initialize accumulated profit to 0
    });

    // Calculate the daily profit for the current day
    const roi = parseFloat(plan.roi) / 100; // Convert ROI percentage to decimal
    const dailyEarnings = amount * roi / 365; // Calculate daily earnings

    // Add the daily profit to the user's available balance immediately
    user.availableBalance += dailyEarnings;

    // Update the accumulated profit for the investment
    investment.accumulatedProfit += dailyEarnings;

    // Save the user and investment
    await user.save();
    await investment.save();

    // Calculate the updated investment balance
    const totalInvestmentBalance = await calculateInvestmentBalance(userId);

    return { investment, totalInvestmentBalance };
  } catch (err) {
    throw new Error('Error buying plan: ' + err.message);
  }
};