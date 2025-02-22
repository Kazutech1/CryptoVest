export const StatusCard = ({ title, value, icon, statusText, statusIcon }) => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gray-400">{title}</h3>
        {statusIcon}
      </div>
      <p className="text-xl font-bold text-white">{value}</p>
      <div className="flex items-center space-x-2 text-blue-400 mt-2">
        {icon}
        <span className="text-sm">{statusText}</span>
      </div>
    </div>
  );