import { useState } from 'react';
import { Wallet, CheckCircle2, XCircle, Bell } from 'lucide-react';
import useProfile from '../../hooks/useProfile.js';


export const Header = ({onAnnounceButtonClick}) => {
  const [isConnected, setIsConnected] = useState(true);
    const { profile, error, successMessage, loading } = useProfile();
  

  return (
    <div className="flex justify-between items-center mb-4 md:mb-8">
      <h1 className="text-xl md:text-2xl font-bold text-white">
        Investment Dashboard
      </h1>
      <div className="flex items-center space-x-2">
      <div className="relative">
          <button
            onClick={onAnnounceButtonClick}
            className="p-2  transition-all"
            title="Announcements"
          >
            <Bell className="w-5 h-5 text-yellow-400" />
          </button>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-700 rounded-full "></span>
        </div>

        <button 
          className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-full hover:from-blue-500 hover:to-purple-500 transition-all flex items-center space-x-2 w-40 md:w-auto"
        >
          <Wallet className="w-4 h-4 md:w-5 md:h-5" />
          <div className="flex items-center space-x-1 truncate">
          <span className="truncate">
  {profile.walletAddress
    ? `${profile.walletAddress.slice(0, 4)}...${profile.walletAddress.slice(-4)}`
    : "Not Connected"}
</span>


            {isConnected ? (
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            ) : (
              <XCircle className="w-4 h-4 text-red-400" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};