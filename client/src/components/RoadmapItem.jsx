// src/components/RoadmapItem.jsx
import { CheckCircle, Clock, Rocket } from 'lucide-react';

export const RoadmapItem = ({ status, title, description }) => {
  const statusStyles = {
    completed: 'border-green-500 bg-green-500/10',
    active: 'border-yellow-500 bg-yellow-500/10 animate-pulse',
    upcoming: 'border-gray-600 bg-gray-500/10'
  };

  const getIcon = () => {
    switch(status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'active':
        return <Clock className="w-6 h-6 text-yellow-400" />;
      default:
        return <Rocket className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <div className={`p-6 rounded-xl border ${statusStyles[status]} transition-all hover:scale-105`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg">
          {getIcon()}
        </div>
        <span className={`text-sm font-semibold ${
          status === 'completed' ? 'text-green-400' : 
          status === 'active' ? 'text-yellow-400' : 
          'text-gray-400'
        }`}>
          {status.toUpperCase()}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};