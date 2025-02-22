export const ClaimInterface = ({ remaining, loading, onClaim }) => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Claim Tokens</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
          <span className="text-gray-400">Available to Claim</span>
          <span className="text-white font-medium">{remaining} CWT</span>
        </div>
        <button
          onClick={onClaim}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-medium transition-all ${
            loading 
              ? 'bg-blue-600 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
          }`}
        >
          {loading ? 'Processing Claim...' : 'Claim Now'}
        </button>
        <div className="text-center text-gray-400 text-sm">
          Gas fee: ~$1.50 (Network: Ethereum Mainnet)
        </div>
      </div>
    </div>
  );