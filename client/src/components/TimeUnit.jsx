// src/components/TimeUnit.jsx
export const TimeUnit = ({ value, label }) => {
    return (
      <div className="text-center">
        <div className="bg-white/5 rounded-lg p-3 w-20">
          <span className="text-2xl font-bold text-white">{value}</span>
        </div>
        <span className="text-sm text-gray-400 mt-2 block">{label}</span>
      </div>
    );
  };