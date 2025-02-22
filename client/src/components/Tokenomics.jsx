// src/components/Tokenomics.jsx
import { Coins, Vote, Gift } from 'lucide-react';
import { TokenDistributionItem } from './TokenDistributionItem';

export const Tokenomics = () => {
  return (
    <div className="py-20 px-6" id="tokenomics">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Tokenomics</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Our token distribution is designed for long-term sustainability and community growth.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-white mb-6">Token Distribution</h3>
            <div className="space-y-4">
              <TokenDistributionItem label="Community Rewards" percentage={40} color="from-blue-500 to-purple-500" />
              <TokenDistributionItem label="Team & Advisors" percentage={20} color="from-green-500 to-teal-500" />
              <TokenDistributionItem label="Ecosystem Fund" percentage={25} color="from-yellow-500 to-orange-500" />
              <TokenDistributionItem label="Liquidity Pool" percentage={15} color="from-pink-500 to-red-500" />
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-white mb-6">Token Utility</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Coins className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <p className="text-gray-300">Staking rewards and yield farming</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <Vote className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <p className="text-gray-300">Governance and voting rights</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <Gift className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <p className="text-gray-300">Exclusive airdrop access</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};