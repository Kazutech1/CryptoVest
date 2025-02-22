import mongoose from 'mongoose';

const investmentPlanSchema = new mongoose.Schema({
  planId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  icon: { type: String, required: true },
  roi: { type: Number, required: true }, // Return on Investment in percentage
  minimum: { type: Number, required: true }, // Minimum investment amount in TRX
  duration: { type: Number, required: true }, // Duration in weeks
  benefits: [String] // List of benefits
});

export default mongoose.model('InvestmentPlan', investmentPlanSchema);