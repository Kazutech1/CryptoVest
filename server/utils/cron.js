import cron from 'node-cron';
import { User } from '../models/UserModel.js';

// Run this job every day at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    const users = await User.find({ 'activeInvestments.isActive': true });

    for (const user of users) {
      let totalDailyProfit = 0;

      for (const investment of user.activeInvestments) {
        if (investment.isActive && new Date() < investment.endDate) {
          totalDailyProfit += investment.dailyProfit;
        } else if (new Date() >= investment.endDate) {
          investment.isActive = false; // Mark as inactive when the plan ends
        }
      }

      // Update the user's withdrawable balance
      user.withdrawableBalance += totalDailyProfit;
      await user.save();
    }

    console.log('Daily profits updated successfully');
  } catch (err) {
    console.error('Error updating daily profits:', err);
  }
});