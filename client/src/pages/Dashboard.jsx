// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Header } from '../components/dashboard/HeaderBar.jsx';
import { SummaryCarousel } from '../components/dashboard/SummaryCard.jsx';
import { ProfitChart } from '../components/dashboard/PortfolioChart.jsx';
import { RecentTransactions } from '../components/dashboard/AssetAllocation';
import {  Navigation } from '../components/dashboard/QuickActions.jsx';
import { AnnouncementPopup } from '../components/Announcement.jsx';
import useAnnouncements from '../hooks/useAnnouncements.js';



const chartData = [
  { name: 'Jan', investment: 22000 },
  { name: 'Feb', investment: 25000 },
  { name: 'Mar', investment: 40000 },
  { name: 'Apr', investment: 32000 },
  { name: 'May', investment: 45000 },
];




export const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);
    const { announcements, loading, error } = useAnnouncements();
  const [isWalletPopupOpen, setIsWalletPopupOpen] = useState(false); // State for popup visibility

  // Function to open the wallet popup
  const handleOpenWalletPopup = () => {
    setIsWalletPopupOpen(true);
  };

  // Function to close the wallet popup
  const handleCloseWalletPopup = () => {
    setIsWalletPopupOpen(false);
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex">
        {/* Desktop Navigation (Left Sidebar) */}
        <Navigation active="Home" />
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto md:ml-60 pb-20 md:pb-0 safe-area-content">
          <div className="max-w-screen-2xl mx-auto p-4 md:p-8">
            <Header onAnnounceButtonClick={handleOpenWalletPopup} />
            <SummaryCarousel />
            <ProfitChart data={chartData} />
            <RecentTransactions />
          </div>
        </div>
  
        {/* Mobile Navigation (Bottom Bar) */}
        <div className="md:hidden">
          <Navigation active="Home" />
        </div>

         <AnnouncementPopup
                isOpen={isWalletPopupOpen}
                onClose={handleCloseWalletPopup}
                announcements={announcements}
              />
      </div>
    );
};