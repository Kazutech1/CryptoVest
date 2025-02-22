// src/components/Roadmap.jsx
import { RoadmapItem } from './RoadmapItem';

export const Roadmap = () => {
  return (
    <div className="py-20 px-6 bg-black/20" id="roadmap">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Roadmap</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Our strategic plan for building the future of crypto wealth management
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <RoadmapItem
            title="Platform Launch"
            description="Official launch of CryptoWealth platform with basic features"
            status="completed"
          />
          <RoadmapItem
            title="Mobile App Release"
            description="iOS and Android app launch with full functionality"
            status="active"
          />
          <RoadmapItem
            title="Airdrop Campaign"
            description="Massive token airdrop to early adopters and community members"
            status="upcoming"
          />
          <RoadmapItem
            title="Global Expansion"
            description="Support for additional languages and fiat currencies"
            status="upcoming"
          />
        </div>
      </div>
    </div>
  );
};