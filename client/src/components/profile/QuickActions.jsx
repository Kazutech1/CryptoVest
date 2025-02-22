// src/components/profile/QuickActions.jsx
import { Settings, Wallet, Headset, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const QuickActions = () => {
  const actions = [
    { label: 'Withdraw Funds', icon: <Wallet className="w-5 h-5 text-green-400" />, path: '/withdrawal' },
    { label: 'Wallet Settings', icon: <Settings2 className="w-5 h-5 text-blue-400" />, path: '/settings' },
    { label: 'Customer Service', icon: <Headset className="w-5 h-5 text-purple-400" />, path: '/support' }, // Added path for Customer Service
  ];

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mt-5 ml-2 mr-2">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Settings className="w-5 h-5 mr-2 text-purple-400" />
        Quick Actions
      </h3>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <Link
            key={index} // Moved key to the Link component
            to={action.path}
            className="block" // Ensure Link behaves as a block element
          >
            <button
              className="w-full flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition border border-white/10"
            >
              <span className="text-gray-400">{action.label}</span>
              {action.icon}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};