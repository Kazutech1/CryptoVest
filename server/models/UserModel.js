import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Function to generate a random referral code
const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase(); // Example: "ABC123"
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  trxWalletAddress: {
    type: String,
    default: '',
  },
  referralCode: {
    type: String,
    unique: true,
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId, // ID of the user who referred this user
    ref: 'User', // Reference to the User model
  },
  availableBalance: {
    type: Number,
    default: 100,
  },
  lastConfirmedBalance: { // Track the last confirmed balance
    type: Number,
    default: 0,
  },
  withdrawableBalance: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  isSuspended: {
    type: Boolean,
    default: false,
  },
  ipAddress: {
    type: String,
    default: '',
  },
  withdrawalAddress: {
    type: String,
    default: '',
  },
  withdrawalStatus: {
    type: String,
    enum: ['pending', 'approved', 'declined'],
    default: 'pending',
  },
   activeInvestments: [
      {
        planId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'InvestmentPlan',
          required: true,
        },
        amountInvested: {
          type: Number,
          required: true,
        },
        startDate: {
          type: Date,
          default: Date.now,
        },
        endDate: {
          type: Date,
          required: true,
        },
        roi: {
          type: Number,
          required: true,
        },
        totalProfit: {
          type: Number,
          default: 0,
        },
        dailyProfit: {
          type: Number,
          default: 0,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
      },
    ],
});

// Generate a referral code before saving the user
userSchema.pre('save', async function (next) {
  if (!this.referralCode) {
    this.referralCode = generateReferralCode();
  }
  next();
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema);