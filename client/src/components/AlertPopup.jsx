// src/components/Common/AlertPopup.jsx
import { CheckCircle, XCircle, X } from 'lucide-react';
import { useEffect } from 'react';

export const AlertPopup = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-8">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-4 min-w-[300px] relative">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex items-start space-x-3">
          {type === 'success' ? (
            <CheckCircle className="w-6 h-6 text-green-400 mt-0.5" />
          ) : (
            <XCircle className="w-6 h-6 text-red-400 mt-0.5" />
          )}
          <div>
            <h3 className="font-semibold text-white">
              {type === 'success' ? 'Success!' : 'Error!'}
            </h3>
            <p className="text-sm text-gray-300">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};