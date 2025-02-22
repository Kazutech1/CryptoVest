import User from '../models/User.mjs';
import InvestmentPlan from '../models/InvestmentPlan.mjs';
import Announcement from '../models/Announcement.mjs';

// Get Dashboard Data
export const getDashboardData = async (req, res) => {
  try {
    const userId = req.userId; // Extract userId from JWT middleware

    const user = await User.findById(userId).populate('investments.planId');

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Calculate investment summary
    let totalInvestment = 0;
    let totalProfit = 0;

    
    const userInvestments = user.investments.map(investment => {
      totalInvestment += investment.amount;
      totalProfit += investment.profit;
  
   const planId = investment._id

      
      

      return {
        amount: investment.amount,
        profit: investment.profit,
        planName: investment.planId?.name || 'Unknown Plan', // Ensure planId is populated before accessing name
        planId: investment._id
      };
    });

    // Get latest announcements
    const announcements = await Announcement.find().sort({ createdAt: -1 }).limit(5);

    // Get all available investment plans
    const plans = await InvestmentPlan.find();

    res.json({
      user,
      userInvestments, // Include detailed user investments
      investmentSummary: {
        totalInvestment,
        totalProfit
      },
      announcements,
      plans
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
