// src/pages/WithdrawCrypto.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUp, Check, XCircle } from 'lucide-react';
import useProfile from '../hooks/useProfile.js';
import { useWithdrawals } from '../hooks/useWithdrawals.js';
import { LoadingSpinner } from './Loading';

export const WithdrawCrypto = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('TRX'); // Default selected crypto
  const [amount, setAmount] = useState(''); // Amount to withdraw
  const [isConfirming, setIsConfirming] = useState(false); // Confirmation state
  const navigate = useNavigate();
  const { profile, error: profileError, successMessage, loading: profileLoading } = useProfile();
  const { 
    withdrawalRequests, 
    loading: withdrawalsLoading, 
    error: withdrawalsError, 
    createWithdrawalRequest, 
    createLoading, 
    createError, 
    createSuccess 
  } = useWithdrawals();

  // Predefined wallet address
  const walletAddress = profile?.walletAddress;

  // Redirect user to settings if wallet address is empty
  useEffect(() => {
    if (!walletAddress) {
      alert('You need to set up your wallet address before making a withdrawal. Redirecting to settings...');
      navigate('/settings');
    }
  }, [walletAddress, navigate]);

  // Check if the user has a pending withdrawal request
  const hasPendingRequest = withdrawalRequests.some(request => request.status === 'pending');

  // Handle form submission
  const handleWithdraw = (e) => {
    e.preventDefault();
    if (!amount) {
      alert('Please enter a valid withdrawal amount.');
      return;
    }
    if (hasPendingRequest) {
      alert('You already have a pending withdrawal request.');
      return;
    }
    setIsConfirming(true); // Show confirmation dialog
  };

  // Handle confirmation
  const handleConfirmWithdrawal = () => {
    createWithdrawalRequest(parseFloat(amount));
    setIsConfirming(false); // Close confirmation dialog
  };

  // Combine loading and error states
  const isLoading = profileLoading || withdrawalsLoading;
  const combinedError = profileError || withdrawalsError;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (combinedError) {
    return <div className="text-red-500 text-center py-4">Error: {combinedError}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Withdraw Crypto</h1>
        </div>
        {/* Withdrawal Form */}
        <form onSubmit={handleWithdraw} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">Amount ( TRX )</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="bg-white/5 border border-white/10 rounded-lg w-full p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Wallet Address */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">Withdraw to</label>
            <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-gray-400">
              {walletAddress}
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 w-full py-3 rounded-lg text-white hover:from-blue-500 hover:to-purple-500 transition-all flex items-center justify-center space-x-2"
            disabled={createLoading || hasPendingRequest}
          >
            {createLoading ? (
              <>
                <ArrowUp className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <ArrowUp className="w-5 h-5" />
                <span>Withdraw</span>
              </>
            )}
          </button>
          {createSuccess && (
            <div className="mt-3 text-green-400 flex items-center space-x-2">
              <Check className="w-5 h-5" />
              <span>{createSuccess}</span>
            </div>
          )}
          {createError && (
            <div className="mt-3 text-red-400 flex items-center space-x-2">
              <XCircle className="w-5 h-5" />
              <span>{createError}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
