import React, { useState } from 'react';
import { RecentTransactions } from '../components/dashboard/AssetAllocation.jsx';
import { Navigation } from '../components/dashboard/QuickActions.jsx';
import { MobileFAB } from '../components/profile/MobileFAB.jsx';
import { ProfileHeader } from '../components/profile/ProfileHeader.jsx';
import { QuickActions } from '../components/profile/QuickActions.jsx';
import { ReferralSection } from '../components/profile/ReferralSection.jsx';
import AnnouncementsSection from '../components/profile/WalletSection.jsx';
import { WalletPopup } from '../components/Deposit.jsx';
import useProfile from '../hooks/useProfile.js';
import useReferralInformation from '../hooks/useReferralInformation.js';
import { useWalletBalance } from '../hooks/useWalletBalance.js'; // ✅ Import the hook
import { LoadingSpinner } from '../components/Loading.jsx';

export const ProfilePage = () => {
  const [isWalletPopupOpen, setIsWalletPopupOpen] = useState(false);

  const { profile, loading, error } = useProfile();
  const { referralInfo, loading: referralLoading, error: referralError } = useReferralInformation();
  const { walletBalance, refreshBalance } = useWalletBalance(); // ✅ Use wallet balance hook

  console.log("Profile Data:", profile);
  console.log("Referral Data:", referralInfo);
  console.log("Wallet Balance:", walletBalance);

  // Function to open the wallet popup
  const handleOpenWalletPopup = () => {
    setIsWalletPopupOpen(true);
  };

  // Function to close the wallet popup
  const handleCloseWalletPopup = () => {
    setIsWalletPopupOpen(false);
  };

  if (loading || referralLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex">
      {/* Desktop Navigation (Left Sidebar) */}
      <Navigation active="Profile" />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto md:ml-60 pb-20 md:pb-0 safe-area-content">
        <h1 className="text-2xl md:text-3xl font-bold text-white m-3">
          User Profile
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pass handleOpenWalletPopup function and profile data */}
          <ProfileHeader 
            onWalletButtonClick={handleOpenWalletPopup} 
            profile={profile} 
            walletBalance={walletBalance} // ✅ Pass wallet balance to ProfileHeader
          />
          <QuickActions />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReferralSection referralInfo={referralInfo} />
          <AnnouncementsSection />
        </div>

        <div className="m-4">
          <RecentTransactions />
        </div>

        <MobileFAB />

        {/* Mobile Navigation (Bottom Bar) */}
        <div className="md:hidden">
          <Navigation active="Profile" />
        </div>
      </div>

      {/* Wallet Popup */}
      <WalletPopup
        isOpen={isWalletPopupOpen}
        onClose={handleCloseWalletPopup}
        // address={walletBalance.address || "No Address Available"} // ✅ Show blockchain address
      />
    </div>
  );
};
