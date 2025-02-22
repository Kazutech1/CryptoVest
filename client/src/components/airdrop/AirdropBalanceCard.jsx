import { Coins, Gift } from "lucide-react";

export const AirdropBalanceCard = ({ total, remaining, startDate, endDate }) => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center space-x-3 mb-2">
            <Gift className="w-8 h-8 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Your Airdrop Balance</h2>
          </div>
          <p className="text-gray-400">Available to claim: {startDate} - {endDate}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl md:text-4xl font-bold text-white mb-1">
            {remaining} CWT
          </p>
          <div className="flex items-center justify-end space-x-2 text-green-400">
            <Coins className="w-4 h-4" />
            <span>Total Allocation: {total} CWT</span>
          </div>
        </div>
      </div>
    </div>
  );