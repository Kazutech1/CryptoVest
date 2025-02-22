// src/pages/InvestmentPlans.js
import React, { useEffect, useState } from 'react';
import { Navigation } from '../components/dashboard/QuickActions.jsx';
import { PlanCard } from '../components/Investments/PlanCard.jsx';
// import { ROIComparisonChart } from '../components/Investments/ROIComparisonChart.js';
import { ComparisonTable } from '../components/Investments/ComparisonTable.jsx';
import { Wallet } from 'lucide-react';
import useInvestments from '../hooks/useInvestment.js';
import useProfile from '../hooks/useProfile.js';
import { LoadingSpinner } from '../components/Loading.jsx';

export const InvestmentPlans = () => {
  const { plans, loadingPlans, errorPlans } = useInvestments();
  const { profile, error, successMessage, loading } = useProfile();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

   if (loading ) return <LoadingSpinner /> ;
 

  if (errorPlans) {
    return <div className="text-red-500 text-center py-4">Error: {errorPlans}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex">
      <Navigation active="Activity" />
      <div className="flex-1 overflow-y-auto md:ml-60 pb-20 md:pb-0 safe-area-content">
        <div className="max-w-screen-2xl mx-auto p-4 md:p-8">
          {/* Header */}
          <div className="md:flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Investment Strategies
            </h1>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-full hover:from-blue-500 hover:to-purple-500 transition-all flex items-center space-x-2">
              <Wallet className="w-5 h-5" />
              <span className="truncate text-white ">Available {profile.balance}</span>
            </button>
          </div>
          {/* ROI Comparison Chart */}
          {/* <ROIComparisonChart data={plans} /> Pass plans data to the chart */}
          {/* Investment Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {plans.map((plan, index) => (
              <PlanCard key={index} plan={plan} />
            ))}
          </div>
          {/* Comparison Table */}
          <ComparisonTable plans={plans} />
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Navigation active="Activity" />
      </div>
    </div>
  );
};
