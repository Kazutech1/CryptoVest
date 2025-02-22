import mongoose from 'mongoose';

const investmentPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  risk: {
    type: String,
    required: true,
  },
  roi: {
    type: String,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  duration: {
    type: String, // Duration as a string (e.g., "1 day", "1 month")
    required: true,
  },
  features: {
    type: [String], // Array of features
    required: true,
  },
});

// Prevent model overwrite error
const InvestmentPlan = mongoose.models.InvestmentPlan || mongoose.model('InvestmentPlan', investmentPlanSchema);

export { InvestmentPlan };