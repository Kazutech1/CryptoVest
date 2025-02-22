import User from "../models/User.mjs";
import Transaction from "../models/Transaction.mjs";

// Get Referral Information
export const getReferralInformation = async (req, res) => {
  try {
    const userId = req.userId; // Extract userId from JWT

    // Find the user and get relevant fields
    const user = await User.findById(userId).select("referralCode referralBonus");

    if (!user) return res.status(404).json({ message: "User not found" });

    // Get total count of referred users
    const totalReferredUsers = await User.countDocuments({ referredBy: userId });

    // Optionally, return a list of referred users
    const referredUsers = await User.find({ referredBy: userId })
      .select("username email createdAt") // Only select necessary fields
      .sort({ createdAt: -1 }) // Sort by newest referrals
      .lean(); // Optimize query for faster response

    res.json({
      referralCode: user.referralCode,
      totalReferredUsers,
      referralBonus: user.referralBonus || 0, // Ensure default value
      referredUsers, // List of referred users
    });
  } catch (error) {
    console.error("🚨 Referral Error:", error);
    res.status(500).json({ message: "Failed to fetch referral info" });
  }
};
