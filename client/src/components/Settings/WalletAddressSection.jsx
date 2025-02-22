import { Wallet } from 'lucide-react';

export const WalletAddressSection = ({ profile, handleProfileChange, errors }) => {
  return (
    <div className="border border-white/10 rounded-xl p-6 mb-8">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
        <Wallet className="w-5 h-5" />
        <span>Wallet Address</span>
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-2">Wallet Address</label>
        <input
          type="text"
          name="walletAddress"
          value={profile.walletAddress || ''}
          onChange={handleProfileChange}
          className="bg-white/5 border border-white/10 rounded-lg w-full p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your wallet address"
        />
        {errors?.walletAddress && <p className="text-sm text-red-400 mt-1">{errors.walletAddress}</p>}
      </div>
    </div>
  );
};
