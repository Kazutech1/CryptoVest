// src/components/TokenDistributionItem.jsx
export const TokenDistributionItem = ({ label, percentage, color }) => {
    return (
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-300">{label}</span>
          <span className="text-white font-semibold">{percentage}%</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full">
          <div
            className={`h-full bg-gradient-to-r ${color} rounded-full`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };