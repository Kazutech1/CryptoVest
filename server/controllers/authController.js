import { User } from '../models/UserModel.js';
import { generateToken } from '../utils/jwt.js';
import { generateWallet } from '../services/walletService.js';

// Function to get the client's IP address
const getClientIP = (req) => {
  // Check for forwarded IP address
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0]; // Get the first IP address in the list
  }
  // Fallback to req.ip
  return req.ip;
};

// Signup a new user
export const signup = async (req, res) => {
  try {
    const { email, password, referralCode } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Check if a referral code was provided
    let referredBy = null;
    if (referralCode) {
      const referringUser = await User.findOne({ referralCode });
      if (!referringUser) {
        return res.status(400).json({ message: 'Invalid referral code' });
      }
      referredBy = referringUser._id;
      // Add a referral bonus to the referring user
      referringUser.availableBalance += 10; // Add 10 TRX as a bonus
      await referringUser.save();
    }
    // Generate a TRX wallet address for the new user
    const wallet = await generateWallet();
    const encryptedPrivateKey = wallet.privateKey;

    // Get the client's IP address
    const ipAddress = getClientIP(req);

    const newUser = new User({
      email,
      password,
      referredBy,
      trxWalletAddress: wallet.address,
      trxPrivateKey: encryptedPrivateKey, // Save encrypted private key
      ipAddress, // Save the IP address
    });
    await newUser.save();
    // Generate a JWT token for the new user
    const token = generateToken(newUser._id);
    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
      token,
      wallet: {
        address: wallet.address,
        privateKey: wallet.privateKey, // Note: Never expose private keys in production!
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};

// Login a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token for the user
    const token = generateToken(user._id);

    res.status(200).json({ message: 'Login successful', user, token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};