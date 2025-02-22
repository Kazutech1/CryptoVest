import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

// Generate a 32-byte encryption key
const encryptionKey = crypto.scryptSync(process.env.ENCRYPTION_KEY || 'fallback_secret', 'salt', 32);

export const encrypt = (text) => {
  if (!text) return null;  // Prevent encrypting null values

  const iv = crypto.randomBytes(16);  // Generate a random IV
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`;  // Store IV with encrypted text
};

export const decrypt = (text) => {
  if (!text) return null;  // Prevent decrypting null values

  const [ivHex, encryptedText] = text.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  walletAddress: { type: String, unique: true },
  wallet: {
    trxAddress: String,
    privateKey: { type: String, select: false }  // Encrypted private key
  },
  balance: { type: Number, default: 0 },
  profitBalance: { type: Number, default: 0 },
  blockchainBalance: { type: Number, default: 0 },
  investments: [
    {
      investmentId: String,
      planId: { type: mongoose.Schema.Types.ObjectId, ref: 'InvestmentPlan' },
      amount: Number,
      startDate: Date,
      endDate: Date,
      profit: Number,
      dailyProfit: Number
    }
  ],
  referralCode: { type: String, unique: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  referralBonus: { type: Number, default: 0 },
  ipAddress: { type: String }

});

// Encrypt privateKey before saving
userSchema.pre('save', function (next) {
  // if (this.wallet?.privateKey && !this.wallet.privateKey.includes(':')) {  
  //   // Ensure privateKey is only encrypted once
  //   this.wallet.privateKey = encrypt(this.wallet.privateKey);
  //}
  next();
});

// Decrypt privateKey when retrieving
// userSchema.methods.getDecryptedPrivateKey = function () {
//   return this.wallet?.privateKey ? decrypt(this.wallet.privateKey) : null;
//   console.log(getDecryptedPrivateKey);
  
// };

export default mongoose.model('User', userSchema);

