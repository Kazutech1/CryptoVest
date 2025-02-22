import User from '../models/User.mjs';

// Get Profile
export const getProfile = async (req, res) => {
  try {
    console.log("Extracted userId:", req.userId); // Debugging log

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized. No user ID found." });
    }

    const user = await User.findById(req.userId).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Profile Fetch Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { walletAddress } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ message: 'Wallet address is required' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.walletAddress = walletAddress;
    await user.save(); // Save changes

    res.json({ message: 'Wallet address updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

