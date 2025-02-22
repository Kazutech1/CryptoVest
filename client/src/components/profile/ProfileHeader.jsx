import { User, Mail, Pencil, QrCode } from 'lucide-react';

export const ProfileHeader = ({ onWalletButtonClick, profile }) => {
  const firstLetter = profile?.username ? profile.username.charAt(0).toUpperCase() : '?';

  return (
    <div className="col-span-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 text-white mt-5 ml-2 mr-2">
      {/* Profile Info Section */}
      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Profile Picture */}
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-xl md:text-2xl font-bold text-white">{firstLetter}</span>
          </div>
          <button className="absolute -bottom-1 -right-1 bg-blue-600 p-1.5 md:p-2 rounded-full hover:bg-blue-500 border-2 border-gray-900 transition-transform transform hover:scale-105">
            <Pencil className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
          </button>
        </div>
        {/* Profile Details */}
        <div className="flex-1 min-w-0">
          <h2 className="text-xl md:text-2xl font-bold text-white truncate">{profile?.fullName || profile?.username || 'Unknown'}</h2>
          <p className="text-gray-400 flex items-center text-sm md:text-base truncate">
            <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2 text-blue-400 flex-shrink-0" />
            <span className="truncate">{profile?.email || 'unknown@example.com'}</span>
          </p>
        </div>
        {/* QR Button - Desktop Only */}
        <button onClick={onWalletButtonClick}
          className="hidden md:flex bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-xl hover:from-blue-500 hover:to-purple-500 transition-all items-center space-x-2 text-sm md:text-base">
          <QrCode className="w-5 h-5" />
          <span>Deposit QR</span>
        </button>
      </div>
     
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3 mt-4 md:mt-6">
        <StatCard label="Total Assets" value={profile.balance} color="white" />
        <StatCard
  label="Member Since"
  value={new Date(profile?.createdAt).getFullYear()}
  color="yellow"
/>

        <StatCard label="Verification" value="Tier 2" color="green" />
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color = 'white' }) => (
  <div className="bg-white/5 p-3 md:p-4 rounded-lg md:rounded-xl border border-white/10">
    <p className="text-gray-400 text-xs md:text-sm mb-1 truncate">{label}</p>
    <p className={`text-lg md:text-xl font-semibold text-${color}-400 truncate`}>
      {value}
    </p>
  </div>
);