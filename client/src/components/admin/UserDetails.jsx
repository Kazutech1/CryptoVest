import {
  User,
  Wallet,
  CreditCard,
  BarChart,
  Clock,
  Shield,
  Activity,
  AlertCircle,
} from "lucide-react";

export const AdminDashboard = ({ user }) => {
  if (!user) {
    return (
      <div className="text-white text-center p-10">No user data available</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        {/* User Header */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <User className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {user.username || user.email}
              </h1>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>

        {/* User Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-400" />
              <span>Basic Information</span>
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Role</span>
                <span className="text-white">{user.role}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status</span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    user.isSuspended
                      ? "bg-red-500/20 text-red-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {user.isSuspended ? "Suspended" : "Active"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Joined</span>
                <span className="text-white">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Wallet Info */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Wallet className="w-5 h-5 text-gray-400" />
              <span>Wallet Information</span>
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">TRX Address</span>
                <div className="text-white overflow-x-auto whitespace-nowrap max-w-[200px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                  {user.walletAddress || "N/A"}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Balance</span>
                <span className="text-white">${user.balance}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Blockchain Balance</span>
                <span className="text-white">${user.blockchainBalance}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Referral Code</span>
                <span className="text-white">{user.referralCode}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Referral Bonus</span>
                <span className="text-white">${user.referralBonus}</span>
              </div>
            </div>
          </div>

          {/* Investments */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <BarChart className="w-5 h-5 text-gray-400" />
              <span>Investments</span>
            </h2>
            {user.investments?.length > 0 ? (
              <div className="space-y-4">
                {user.investments.map((investment, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                          <CreditCard className="w-5 h-5 text-gray-400" />
                          <span>Investment #{index + 1}</span>
                        </h3>
                        <p className="text-gray-400">Amount: ${investment.amount}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400">Profit: ${investment.profit}</p>
                        <p className="text-gray-400">
                          Daily Profit: ${investment.dailyProfit}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 text-gray-400 text-sm flex justify-between">
                      <p className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>
                          Start: {new Date(investment.startDate).toLocaleDateString()}
                        </span>
                      </p>
                      <p className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>
                          End: {new Date(investment.endDate).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-gray-400" />
                <span>No investments found</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
