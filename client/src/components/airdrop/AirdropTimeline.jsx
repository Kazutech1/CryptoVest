export const AirdropTimeline = ({ timeline }) => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Airdrop Timeline</h3>
      <div className="relative">
        {timeline.map((item, index) => (
          <div key={index} className="flex items-start pb-4 last:pb-0">
            <div className="relative">
              <div className={`w-4 h-4 rounded-full ${
                item.status === 'completed' ? 'bg-green-400' :
                item.status === 'current' ? 'bg-blue-400' : 'bg-white/20'
              }`} />
              {index !== timeline.length - 1 && (
                <div className="absolute left-1.5 top-4 w-0.5 h-full bg-white/20" />
              )}
            </div>
            <div className="ml-4 flex-1">
              <p className="text-gray-400 text-sm">{item.date}</p>
              <p className="text-white">{item.event}</p>
              {item.status === 'current' && (
                <span className="inline-block px-2 py-1 mt-1 text-xs bg-blue-500/20 text-blue-400 rounded">
                  Current Phase
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );