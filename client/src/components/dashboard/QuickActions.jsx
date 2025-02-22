import { PieChart, Activity, Gift, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export const Navigation = ({active}) => {
  const [activeTab, setActiveTab] = useState(active);

  return (
    <>
      {/* Desktop Navigation - Fixed Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-60 bg-gray-900/95 backdrop-blur-sm border-r border-white/10 z-50">
        <div className="p-4">
          <h2 className="text-xl font-bold text-white mb-6">Investor Dashboard</h2>
          <nav className="space-y-2">
            {[
              { icon: PieChart, label: 'Home', path: '/dashboard' },
              { icon: Activity, label: 'Activity', path: '/investments' },
              { icon: Gift, label: 'Airdrop', path: '/airdrop' },
              { icon: User, label: 'Profile', path: '/profile' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setActiveTab(item.label)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  activeTab === item.label
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation - Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-white/10 md:hidden z-50 safe-area-bottom">
        <div className="grid grid-cols-4 gap-0 w-full max-w-screen mx-auto px-2 py-2">
          {[
            { icon: PieChart, label: 'Home', path: '/dashboard' },
            { icon: Activity, label: 'Activity', path: '/investments' },
            { icon: Gift, label: 'Airdrop', path: '/airdrop' },
            { icon: User, label: 'Profile', path: '/profile' },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setActiveTab(item.label)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                activeTab === item.label
                  ? 'text-blue-400 bg-blue-500/20'
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};