// src/components/profile/ReferralSection.jsx
import { Copy, Gift, Share2, Share2Icon, Users } from 'lucide-react';

export const ReferralSection = ({referralInfo}) => {
  const referralStats = [
    { label: 'Total Referrals', value: referralInfo.totalReferredUsers , icon: <Users className="w-5 h-5 text-purple-400" /> },
   { label: 'Earned Rewards', 
    value: `${referralInfo.referralBonus} TRX`, // ✅ Fix: Correct use of template literals
    icon: <Gift className="w-5 h-5 text-green-400" /> }
    
  ];

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mt-5 mx-2">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Share2 className="w-6 h-6 mr-2 text-blue-400" />
          Referral Program
        </h3>
        <span className="text-sm bg-blue-400/10 px-2 py-1 rounded-md text-blue-400">
          Active
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {referralStats.map((stat, index) => (
          <div key={index} className="bg-white/5 p-4 rounded-lg border border-white/10">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">{stat.label}</p>
              {stat.icon}
            </div>
            <p className="text-xl font-semibold text-white mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4  ">
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <p className="text-gray-400 text-sm mb-2">Your Referral Code</p>
          <div className="flex items-center justify-between">
            <p className="text-white font-mono">{referralInfo.referralCode}</p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 rounded-lg text-sm font-medium hover:from-blue-500 hover:to-purple-500 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 text-white flex items-center justify-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900">
  <Copy className="w-4 h-4" />
</button>
          </div>
        </div>

        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <p className="text-gray-400 text-sm mb-2">Share Your Link</p>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value="https://crypto.com/ref/CRYPTO42"
              readOnly
              className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
            />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 rounded-lg text-sm font-medium hover:from-blue-500 hover:to-purple-500 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 text-white flex items-center justify-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900">
  <Share2Icon className="w-4 h-4" />
</button>
          </div>
        </div>
      </div>
    </div>
  );
};