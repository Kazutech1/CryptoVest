import { Clock } from "lucide-react";

export const ProgressCard = ({ claimed, total, daysLeft }) => {
    const progress = (claimed / total) * 100;
    
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-400">Claim Progress</h3>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 text-sm">{daysLeft} days left</span>
          </div>
        </div>
        <div className="relative pt-2">
          <div className="flex mb-2 items-center justify-between">
            <span className="text-xs font-semibold text-blue-400">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-white/5">
            <div 
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    );
  };