// src/components/profile/MobileFAB.jsx
import { QrCode } from 'lucide-react';
import { useState } from 'react';
import { WalletPopup } from '../Deposit';

export const MobileFAB = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-6 md:hidden">
      <button onClick={() => setIsModalOpen(true)}
      className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-lg hover:from-blue-500 hover:to-purple-500 transition-transform">
        <QrCode className="w-6 h-6 text-white" />
      </button>

      <WalletPopup
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        walletAddress="{walletAddress}"
      />
    </div>
  );
};