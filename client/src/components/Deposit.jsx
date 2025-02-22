// src/components/WalletPopup.jsx
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import QRCode from 'react-qr-code';
import useProfile from '../hooks/useProfile.js';



export const WalletPopup = ({ isOpen, onClose }) => {
  const timeoutRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { profile, error, successMessage, loading } = useProfile();
  

  const address = profile?.wallet?.trxAddress

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[1000]">
      <div className="bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 rounded-2xl p-6 max-w-sm w-full border border-white/10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Wallet Address</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* QR Code */}
        <div className="flex justify-center p-4 bg-white/5 rounded-lg">
          <QRCode
            value={address}
            size={200}
            bgColor="transparent"
            fgColor="#ffffff"
          />
        </div>

        {/* Wallet Address */}
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">Your Wallet Address</p>
          <p className="text-white font-mono break-all">{address}</p>
        </div>

        {/* Payment Confirmation Button */}
        <div className="mt-6">
          <button
            onClick={() => {
              setIsProcessing(true);
              timeoutRef.current = setTimeout(() => {
                setIsProcessing(false);
                onClose();
              }, 2000);
            }}
            disabled={isProcessing}
            className={`w-full relative overflow-hidden ${
              isProcessing 
                ? 'bg-blue-700 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200`}
          >
            {isProcessing ? 'Processing...' : 'I have completed payment'}
            
            {/* Progress bar animation */}
            {isProcessing && (
              <div
                className="absolute bottom-0 left-0 h-1 bg-blue-400/50 transition-all duration-2000"
                style={{
                  width: '100%',
                  transformOrigin: 'left center',
                  animation: 'progress 2s linear forwards'
                }}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Add this CSS to your global styles (or use a CSS-in-JS solution)
// @keyframes progress {
//   0% { transform: scaleX(0); }
//   100% { transform: scaleX(1); }
// }