// src/components/Staking.jsx
import { Wallet, Zap, Diamond, CheckCircle } from 'lucide-react';

export const Staking = () => {
  return (
    <div className="py-20 px-6 bg-black/20" id="staking">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Staking Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StakingCard
            title="Basic Staking"
            apy="8.5%"
            features={['Flexible withdrawals', 'Daily rewards', 'CWT rewards']}
            icon={<Wallet className="w-8 h-8" />}
          />
          <StakingCard
            title="Advanced Staking"
            apy="12.2%"
            features={['30-day lock', 'Bonus rewards', 'Premium support']}
            icon={<Zap className="w-8 h-8" />}
            featured
          />
          <StakingCard
            title="VIP Staking"
            apy="18.9%"
            features={['90-day lock', 'Airdrop priority', 'Personal manager']}
            icon={<Diamond className="w-8 h-8" />}
          />
        </div>
      </div>
    </div>
  );
};

const StakingCard = ({ title, apy, features, icon, featured }) => (
  <div className={`relative p-8 border rounded-2xl ${featured ? 'border-blue-500 bg-blue-500/10' : 'border-white/10'} transition hover:border-blue-400`}>
    {featured && (
      <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
        Most Popular
      </div>
    )}
    <div className="text-center mb-6">
      <div className="inline-block p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        {apy} APY
      </div>
    </div>
    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2 text-gray-300">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <button className={`w-full py-3 rounded-lg font-semibold ${featured ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-800'} hover:opacity-90 transition`}>
      Start Staking
    </button>
  </div>
);