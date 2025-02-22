import { Clock, ArrowUpRight, ArrowDownLeft, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import useTransactionHistory from '../../hooks/useTransactionHistory';
import {useWithdrawals} from '../../hooks/useWithdrawals';

export const RecentTransactions = () => {
  const { transactions, loading: transactionsLoading, error: transactionsError } = useTransactionHistory();
  const { withdrawalRequests, loading: withdrawalsLoading, error: withdrawalsError } = useWithdrawals();

  const combinedTransactions = [...transactions, ...withdrawalRequests].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const getIcon = (transaction) => {
    if (transaction.type === 'investment') return <ArrowUpRight className="w-5 h-5 text-green-400" />;
    if (transaction.type === 'withdrawal') return <ArrowDownLeft className="w-5 h-5 text-red-400" />;
    if (transaction.status === 'completed') return <CheckCircle className="w-5 h-5 text-green-400" />;
    if (transaction.status === 'failed') return <XCircle className="w-5 h-5 text-red-400" />;
    return <Clock className="w-5 h-5 text-yellow-400" />;
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-white">Recent Transactions</h2>
        <Link to='/transactions'>
          <button className="text-blue-400 hover:text-blue-300 flex items-center">
            <span className="hidden md:inline">View All</span>
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </Link>
      </div>

      {/* Loading & Error Handling */}
       { (transactionsLoading || withdrawalsLoading) &&
      <div className="flex justify-center items-center min-h-[200px]">
             <div className="w-12 h-12 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin"></div>

      </div>
    }
      {(transactionsError || withdrawalsError) && <p className="text-red-500">Error loading transactions.</p>}

      {/* Transaction List */}
      <div className="space-y-4">
        {combinedTransactions.length === 0 && !(transactionsLoading || withdrawalsLoading) ? (
          <p className="text-gray-400">No recent transactions found.</p>
        ) : (
          combinedTransactions.slice(0, 3).map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'investment' ? 'bg-green-500/20' :
                  transaction.type === 'withdrawal' ? 'bg-red-500/20' :
                  transaction.status === 'completed' ? 'bg-green-500/20' :
                  transaction.status === 'failed' ? 'bg-red-500/20' : 'bg-yellow-500/20'
                }`}>
                  {getIcon(transaction)}
                </div>
                <div>
                  <p className="text-white text-sm md:text-base">{transaction.type ? transaction.type : 'Withdrawal'}</p>
                  <p className="text-gray-400 text-xs md:text-sm">{transaction.amount} TRX</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-white text-sm md:text-base">{transaction.amount} TRX</p>
                <div className="flex items-center space-x-2 justify-end">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-xs md:text-sm">{new Date(transaction.createdAt).toLocaleDateString()}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    transaction.status === 'completed' 
                      ? 'bg-green-500/20 text-green-400'
                      : transaction.status === 'failed'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
