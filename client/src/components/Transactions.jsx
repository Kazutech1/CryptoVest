import { useState } from 'react';
import { ArrowUp, ArrowDown, Search, Clock, Wallet, ChevronRight, CheckCircle, XCircle, Banknote, TrendingUp } from 'lucide-react';
import { WalletPopup } from './Deposit.jsx';
import useTransactions from '../hooks/useTransactionHistory';
import { useWithdrawals } from '../hooks/useWithdrawals.js';
import {LoadingSpinner} from './Loading'


export const Transactions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch transactions and withdrawals
  const { transactions, loading: transactionsLoading, error: transactionsError } = useTransactions();
  const { withdrawalRequests, loading: withdrawalsLoading, error: withdrawalsError } = useWithdrawals();

  const walletAddress = '0x1f...C4B2';

  // Merge and sort transactions & withdrawals by date
  const combinedHistory = [
    ...transactions.map(tx => ({
      id: tx.transactionId,
      type: tx.type, // 'received' or 'sent'
      amount: tx.amount,
      currency: tx.currency,
      date: new Date(tx.createdAt),
      status: null
    })),
    ...withdrawalRequests.map(wd => ({
      id: wd._id,
      type: 'withdrawal',
      amount: wd.amount,
      currency: 'USDT',
      date: new Date(wd.createdAt),
      status: wd.status // 'approved', 'rejected', or 'pending'
    }))
  ].sort((a, b) => b.date - a.date);

  const getIcon = (item) => {
    if (item.type === 'received') return <ArrowDown className="w-5 h-5 text-green-400" />;
    if (item.type === 'sent') return <ArrowUp className="w-5 h-5 text-red-400" />;
    if (item.type === 'withdrawal') return <Banknote className="w-5 h-5 text-blue-400" />;
    if (item.type === 'investment') return <TrendingUp className="w-5 h-5 text-purple-400" />;
    if (item.status === 'approved') return <CheckCircle className="w-5 h-5 text-green-400" />;
    if (item.status === 'rejected') return <XCircle className="w-5 h-5 text-red-400" />;
    return <Clock className="w-5 h-5 text-yellow-400" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Transaction History</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-lg text-sm hover:from-blue-500 hover:to-purple-500 transition-all flex items-center space-x-2"
          >
            <Wallet className="w-4 h-4" />
            <span>Wallet Details</span>
          </button>
        </div>

        {/* Transactions & Withdrawals Section */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
          {transactionsLoading || withdrawalsLoading ? (
               <div className="flex justify-center items-center min-h-[200px]">
               <div className="w-12 h-12 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>
  
        </div>
          ) : transactionsError || withdrawalsError ? (
            <p className="text-red-400">Error loading history</p>
          ) : combinedHistory.length > 0 ? (
            combinedHistory.map((item) => (
              <div
                key={item.id}
                className="group flex items-center justify-between p-4 hover:bg-white/10 rounded-lg transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-lg ${
                      item.type === 'received' ? 'bg-green-500/20' :
                      item.type === 'sent' ? 'bg-red-500/20' :
                      item.type === 'withdrawal' ? 'bg-blue-500/20' :
                      item.type === 'investment' ? 'bg-purple-500/20' :
                      item.status === 'approved' ? 'bg-green-500/20' :
                      item.status === 'rejected' ? 'bg-red-500/20' : 'bg-yellow-500/20'
                    }`}
                  >
                    {getIcon(item)}
                  </div>
                  <div>
                    <p className="text-white font-medium capitalize">{item.type}</p>
                    <p className="text-sm text-gray-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.date.toLocaleString()}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    item.type === 'received' || item.status === 'approved' ? 'text-green-400' :
                    item.type === 'sent' || item.status === 'rejected' ? 'text-red-400' :
                    item.type === 'withdrawal' ? 'text-blue-400' :
                    item.type === 'investment' ? 'text-purple-400' : 'text-yellow-400'
                  }`}>
                    {item.amount} {item.currency}
                  </p>
                  {item.status && (
                    <p className={`text-sm capitalize ${
                      item.status === 'approved' ? 'text-green-400' :
                      item.status === 'rejected' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {item.status}
                    </p>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center p-6">No transactions found</p>
          )}
        </div>
      </div>

      {/* Wallet Popup */}
      <WalletPopup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}  />
    </div>
  );
};
