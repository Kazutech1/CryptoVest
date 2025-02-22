// src/pages/PlanDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Shield, Rocket, Scale, Globe, Coins, Gem,
  ArrowLeft, Zap, Clock, AlertCircle, BadgeDollarSign 
} from 'lucide-react';
import { ArrowRight, BadgePercent, Medal, Star,  Diamond, ShieldCheck, Crown, Trophy } from 'lucide-react';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import  useInvestments  from '../hooks/useInvestment';
import useProfile from '../hooks/useProfile.js';


export const PlanDetails = () => {
  const { planType } = useParams();
  const navigate = useNavigate();
  const { profile, error, successMessage, loading } = useProfile();
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [agreed, setAgreed] = useState(false);

  // Fetch all plans using the custom hook
  const { plans, loadingPlans, errorPlans } = useInvestments();

  // Decode the plan type from the URL (replace hyphens with spaces)
  const decodedPlanType = planType.replace(/-/g, ' ');

  // Find the selected plan based on the decoded plan type
  const plan = plans.find(p => 
    p.name.toLowerCase() === decodedPlanType.toLowerCase()
  );

  // Redirect to the plans page if the plan is not found
  useEffect(() => {
    if (!plan && !loadingPlans) {
      navigate('/investments');
    }
  }, [plan, loadingPlans, navigate]);

  // Show a loading state while fetching plans
  if (loadingPlans) {
    return <div className="text-white text-center py-4">Loading plan details...</div>;
  }

  // Show an error message if there's an issue fetching plans
  if (errorPlans) {
    return <div className="text-red-500 text-center py-4">Error: {errorPlans}</div>;
  }

  // If the plan is not found, return null (handled by useEffect redirect)
  if (!plan) return null;

  // Function to handle investment amount change
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value >= plan.minimum) {
      setInvestmentAmount(value);
    } else {
      setInvestmentAmount('');
    }
  };

  // Function to handle agreement toggle
  const handleAgreeToggle = () => {
    setAgreed(!agreed);
  };

  // Function to navigate to confirmation page
  const handleContinue = () => {
    if (profile.balance && agreed) {
      navigate(`/plans/confirm/${planType}?amount=${profile.balance}`);
    } else {
      alert('Please enter a valid investment amount and agree to the terms.');
    }
  };
  const iconMapping = {
    'badge-percent': (
        <BadgePercent className="w-5 h-5 text-yellow-400" />
    ),
    'medal': (
        <Medal className="w-5 h-5 text-gray-400" />
    ),
    'star': (
        <Star className="w-5 h-5 text-yellow-400" />
    ),
    'gem': (
        <Gem className="w-5 h-5 text-purple-400" />
    ),
    'diamond': (
        <Diamond className="w-5 h-5 text-blue-400" />
    ),
    'shield-check': (
        <ShieldCheck className="w-5 h-5 text-green-400" />
    ),
    'crown': (
        <Crown className="w-5 h-5 text-yellow-400" />
    ),
    'trophy': (
        <Trophy className="w-5 h-5 text-pink-400" />
    ),
    'rocket': (
        <Rocket className="w-5 h-5 text-red-400" />
      
    ),
  };
  
  const planIconKey = plan.icon || 'shield'; // Default icon key
    
    const planIcon = iconMapping[planIconKey] || <Shield className="w-6 h-6 text-gray-400" />; // Fallback to Shield if not found
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="max-w-screen-2xl mx-auto p-4 md:p-8">
        {/* Back Button */}
        <Link
          to="/investments"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft className="mr-2" /> Back to All Plans
        </Link>
        {/* Plan Header */}
        <div className="bg-white/5 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {plan.name} Strategy
              </h1>
              <div className="flex items-center space-x-4 text-gray-400">
                
                <div className="flex items-center space-x-1">
                  <Clock className="w-5 h-5" />
                  <span>{plan.duration} weeks</span>
                </div>
              </div>
            </div>
            <div className={`mt-4 md:mt-0 px-4 py-2 rounded-full bg-green-500/20`}>
              {planIcon}
            </div>
          </div>
        </div>
        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Investment Form */}
          <div className="bg-white/5 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Start Investment</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">Investment Amount (TRX)</label>
                <input
                  type="number"
                  value={profile.balance || ''}
                  onChange={handleAmountChange}
                  // disabled
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={plan.minimum}
                  placeholder={`Minimum: ${plan.minimum} TRX`}
                />
              </div>
              <div className="border-t border-white/10 pt-4">
                <h3 className="text-lg font-semibold text-white mb-4">Key Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-gray-400">ROI Range</div>
                  <div className="text-white">{plan.roi}%</div>
                  <div className="text-gray-400">Minimum Investment</div>
                  <div className="text-white">{plan.minimum} TRX</div>
                  <div className="text-gray-400">Duration</div>
                  <div className="text-white">{plan.duration} weeks</div>
                  <div className="text-gray-400">Liquidity</div>
                  <div className="text-white">
                    {plan.type === 'Conservative' ? 'Daily' : 
                     plan.type === 'Balanced' ? 'Weekly' : 'Monthly'}
                  </div>
                  <div className="text-gray-400">Insurance</div>
                  <div className="text-white">
                    {/* {plan.features.includes('Insurance') ? 'Yes' : 'No'} */}
                  </div>
                </div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <p className="text-sm text-yellow-300">
                    {plan.risk} risk strategies may experience significant volatility. 
                    Past performance does not guarantee future results.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={handleAgreeToggle}
                  className="form-checkbox text-blue-600 focus:ring-blue-500"
                />
                <label className="text-gray-400">
                  I agree to the terms and conditions
                </label>
              </div>
              <button
                onClick={handleContinue}
               disabled={ profile.balance < plan.minimum || !agreed}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Continue to Confirmation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};