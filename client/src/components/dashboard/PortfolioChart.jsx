import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const ProfitChart = ({ data }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-6 mb-6">
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
      <h2 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-0">
        Investment Activity
      </h2>
      <div className="flex space-x-2 md:space-x-4">
        {['1W', '1M', '1Y', 'ALL'].map((item) => (
          <button 
            key={item}
            className={`text-sm md:text-base ${item === 'ALL' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
    <div className="h-48 md:h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis 
            dataKey="name" 
            stroke="#64748b" 
            tick={{ fill: '#94a3b8' }}
          />
          <YAxis 
            stroke="#64748b" 
            tick={{ fill: '#94a3b8' }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0f172a',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            formatter={(value) => [`$${value.toLocaleString()}`, 'Investment']}
          />
          <Line 
            type="monotone" 
            dataKey="investment" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ fill: '#1d4ed8', strokeWidth: 2 }}
            activeDot={{ r: 6 }}
            strokeOpacity={0.8}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);