import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: 'InvestmentPlan', required: true },
  amount: { type: Number, required: true }, // Initial investment amount
  endDate: { type: Date, required: true }, // End date of the investment
  status: { type: String, enum: ['active', 'completed'], default: 'active' },
  accumulatedProfit: { type: Number, default: 0 }, // Accumulated profit so far
});

export const Investment = mongoose.model('Investment', investmentSchema);

