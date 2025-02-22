import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';
import {TronWeb} from 'tronweb';
import { encrypt } from '../models/User.mjs'; // Adjust path if necessary
import Transaction from '../models/Transaction.mjs';
import mongoose from 'mongoose';

// Helper function to generate a random referral code
function generateReferralCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Register
export const register = async (req, res) => {
  try {
    const { username, email, password, referredBy, isAdmin } = req.body;

    // Get the user's IP address
    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0] || req.ip;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate a unique referral code
    let referralCode;
    do {
      referralCode = generateReferralCode();
    } while (await User.exists({ referralCode }));

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Determine if the user is an admin
    const isFirstUser = (await User.countDocuments()) === 0;
    const isUserAdmin = isFirstUser ? true : isAdmin && req.user?.isAdmin;

    // Generate TRX wallet
    let walletData = { trxAddress: null, privateKey: null };
    try {
      const tronWeb = new TronWeb({ fullHost: process.env.TRON_API_URL });
      const wallet = await tronWeb.createAccount();

      if (wallet?.address?.base58 && wallet.privateKey) {
        walletData = {
          trxAddress: wallet.address.base58,
          privateKey: encrypt(wallet.privateKey) // Encrypt before saving
        };
      } else {
        throw new Error('Failed to generate TRON wallet');
      }
    } catch (error) {
      console.error('TRON Wallet Error:', error);
    }

    // Create the new user
    const newUser = new User({
      username,
      email,
      passwordHash,
      referralCode,
      isAdmin: isUserAdmin,
      wallet: walletData,
      ipAddress
    });

    // Handle referral
    if (referredBy) {
      const referrer = await User.findOne({ referralCode: referredBy });
      if (!referrer) {
        return res.status(400).json({ message: "Invalid referral code" });
      }
      newUser.referredBy = referrer._id;
    }
    

    await newUser.save();

    // Return the response
    res.status(201).json({
      role: isUserAdmin ? 'admin' : 'user', // Ensure role is a string
      message: 'User registered successfully',
      wallet: {
        address: newUser.wallet.trxAddress,
        privateKey: newUser.wallet.privateKey // Encrypted value
      },
      ipAddress
    });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};


// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const role = user.role

    res.json({ token, role

     });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ userId: decoded.userId });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};