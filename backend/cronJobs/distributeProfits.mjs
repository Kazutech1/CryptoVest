import cron from 'node-cron';
import User from '../models/User.mjs';
import mongoose from 'mongoose';

// Function to distribute daily profits
const distributeDailyProfits = async () => {
  try {
    const users = await User.find({ 'investments.endDate': { $gt: new Date() } });

    for (const user of users) {
      const currentDate = new Date();
      user.investments = user.investments.map(investment => {
        if (currentDate >= investment.startDate && currentDate <= investment.endDate) {
          investment.profit += investment.dailyProfit;
          user.profitBalance += investment.dailyProfit; // Add daily profit to user's balance
        }
        return investment;
      });

      await user.save();
    }

    console.log('Daily profits distributed successfully');
  } catch (error) {
    console.error('Error distributing daily profits:', error);
  }
};

// Schedule the cron job to run daily at midnight
cron.schedule('0 0 * * *', distributeDailyProfits);

export default distributeDailyProfits;


// import cron from 'node-cron';
// import User from '../models/User.mjs';
// import mongoose from 'mongoose';

// // Function to distribute daily profits
// const distributeDailyProfits = async () => {
//   try {
//     const users = await User.find({ 'investments.endDate': { $gt: new Date() } });

//     for (const user of users) {
//       const currentDate = new Date();
//       user.investments = user.investments.map(investment => {
//         if (currentDate >= investment.startDate && currentDate <= investment.endDate) {
//           investment.profit += investment.dailyProfit;
//           user.balance += investment.dailyProfit; // Add daily profit to user's balance
//         }
//         return investment;
//       });

//       await user.save();
//     }

//     console.log('✅ Daily profits distributed successfully');
//   } catch (error) {
//     console.error('❌ Error distributing daily profits:', error);
//   }
// };

// // Schedule the cron job to run daily at midnight in Eastern Time (Canada)
// cron.schedule('0 0 * * *', distributeDailyProfits, {
//   timezone: 'America/Toronto' // Set to Canada (Eastern Time)
// });

// export default distributeDailyProfits;
