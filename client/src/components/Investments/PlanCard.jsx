// src/components/Investments/PlanCard.js
import React from 'react';
import { ArrowRight, Zap, Shield, BadgePercent, Medal, Star, Gem, Diamond, ShieldCheck, Crown, Trophy, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

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


export const PlanCard = ({ plan }) => {
  // Fallback values for missing fields
  const planType = plan.name || 'Unknown Plan';
  const planRoi = plan.roi || 'N/A';
  const planMin = plan.minimum || 0;
  const planDuration = plan.duration || 'N/A';
  const planFeatures = plan.benefits || [];
  const planColor = plan.color || 'bg-gray-500'; // Default color
  const planIconKey = plan.icon || 'shield'; // Default icon key
  // Resolve the icon dynamically using the mapping
  const planIcon = iconMapping[planIconKey] || <Shield className="w-6 h-6 text-gray-400" />; // Fallback to Shield if not found
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${planColor}/20`}>
            {planIcon} {/* Render the resolved icon */}
          </div>
          <h3 className="text-xl font-semibold text-white">{planType}</h3>
        </div>
      
      </div>
      <div className="space-y-4 mb-6">
        {[
          { label: 'ROI Range', value: `${planRoi}%` },
          { label: 'Minimum', value: `${planMin} TRX` },
          { label: 'Duration', value: `${planDuration} weeks` }
        ].map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-400">{item.label}</span>
            <span className="text-white font-medium">{item.value}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 pt-4">
        <h4 className="text-sm text-gray-400 mb-3">Key Features</h4>
        <ul className="space-y-2">
          {planFeatures.length > 0 ? (
            planFeatures.map((feature, fIndex) => (
              <li key={fIndex} className="flex items-center space-x-2 text-sm">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">{feature}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-400 text-sm">No features available</li>
          )}
        </ul>
      </div>
      <Link
        to={`/plans/${planType.toLowerCase().replace(' ', '-')}`}
        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2"
      >
        <span>Explore Plan</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};