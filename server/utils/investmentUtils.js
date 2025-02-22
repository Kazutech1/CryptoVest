import { Investment } from '../models/Investment.js';
import { User } from '../models/UserModel.js';

export const updateDailyProfits = async () => {
  try {
    // Fetch all active investments
    const activeInvestments = await Investment.find({ status: 'active' })
      .populate('plan', 'roi') // Populate the ROI field of the plan
      .populate('user', 'availableBalance'); // Populate the user's available balance

    for (const investment of activeInvestments) {
      const roi = parseFloat(investment.plan.roi) / 100; // Convert ROI percentage to decimal
      const dailyEarnings = investment.amount * roi / 365; // Calculate daily earnings

      // Update the accumulated profit for the investment
      investment.accumulatedProfit += dailyEarnings;
      await investment.save();

      // Update the user's available balance with the daily profit
      investment.user.availableBalance += dailyEarnings;
      await investment.user.save();
    }
  } catch (err) {
    console.error('Error updating daily profits:', err.message);
  }
};