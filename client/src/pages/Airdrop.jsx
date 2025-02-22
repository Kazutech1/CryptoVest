
import { useState, useEffect } from 'react';
import { 
  BadgeCheck, Zap, Gift, Coins, Clock, Share2, 
  Twitter, Discord, CheckCircle2, AlertCircle, Wallet 
} from 'lucide-react';
import { AirdropBalanceCard } from '../components/airdrop/AirdropBalanceCard';
import { ParticipationStatusGrid } from '../components/airdrop/ParticipationStatusGrid';
import { SocialVerification } from '../components/airdrop/SocialVerification';
import { ProgressCard } from '../components/airdrop/ProgressCard';
import { StatusCard } from '../components/airdrop/StatusCard';
import { EligibilityRequirements } from '../components/airdrop/EligibilityRequirements';
import { AirdropTimeline } from '../components/airdrop/AirdropTimeline';
import { TokenAllocationChart } from '../components/airdrop/TokenAllocationChart';
import { ClaimInterface } from '../components/airdrop/ClaimInterface';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Navigation } from '../components/dashboard/QuickActions';

const WalletButton = () => (
  <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-full hover:from-blue-500 hover:to-purple-500 transition-all flex items-center space-x-2">
    <Wallet className="w-5 h-5" />
    <span className="truncate">0x1f...C4B2</span>
  </button>
);

export const AirdropPlans = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  
  // Sample data
  const airdropData = {
    requirements: [
      { id: 1, task: "Hold 100+ CWT", completed: true },
      { id: 2, task: "Follow Twitter", completed: true },
      { id: 3, task: "Join Discord", completed: false },
      { id: 4, task: "Retweet post", completed: false }
    ],
    timeline: [
      { date: "2024-03-01", event: "Airdrop Announcement", status: "completed" },
      { date: "2024-04-15", event: "Snapshot Date", status: "current" },
      { date: "2024-05-01", event: "Claim Period Starts", status: "upcoming" },
      { date: "2024-06-30", event: "Claim Deadline", status: "upcoming" }
    ],
    allocation: [
      { name: 'Community', value: 60, color: '#3b82f6' },
      { name: 'Team', value: 20, color: '#8b5cf6' },
      { name: 'Liquidity', value: 15, color: '#10b981' },
      { name: 'Reserves', value: 5, color: '#f59e0b' }
    ]
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClaim = () => {
    setClaimLoading(true);
    setTimeout(() => {
      setClaimLoading(false);
    }, 2000);
  };
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex">
        {/* Desktop Navigation (Left Sidebar) */}
        <Navigation  active="Airdrop"/>
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto md:ml-60 pb-20 md:pb-0 safe-area-content">
          <div className="max-w-screen-2xl mx-auto p-4 md:p-8">
            {/* Header Section */}
            <div className="md:flex justify-between items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-0">
                CWT Network Airdrop Program
              </h1>
              <WalletButton />
            </div>
  
            <AirdropBalanceCard 
              total={1500}
              remaining={650}
              startDate="May 1, 2024"
              endDate="June 30, 2024"
            />
  
            <ParticipationStatusGrid>
              <StatusCard
                title="Eligibility Status"
                value="Qualified"
                icon={<Zap className="w-4 h-4" />}
                statusText="Tier 2 Participant"
                statusIcon={<BadgeCheck className="w-6 h-6 text-green-400" />}
              />
              <ProgressCard
                claimed={850}
                total={1500}
                daysLeft={42}
              />
              <SocialVerification
                onTwitterConnect={() => {}}
                onDiscordConnect={() => {}}
              />
            </ParticipationStatusGrid>
  
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Requirements & Timeline */}
              <div className="space-y-6">
                <EligibilityRequirements requirements={airdropData.requirements} />
                <AirdropTimeline timeline={airdropData.timeline} />
              </div>
  
              {/* Allocation & Claim */}
              <div className="space-y-6">
                <TokenAllocationChart 
                  data={airdropData.allocation} 
                  isMobile={isMobile} 
                />
                <ClaimInterface 
                  remaining={650}
                  loading={claimLoading}
                  onClaim={handleClaim}
                />
              </div>
            </div>
          </div>
        </div>
  
        {/* Mobile Navigation (Bottom Bar) */}
        <div className="md:hidden">
        <Navigation  active="Airdrop"/>
        
        </div>
      </div>
    );
  };